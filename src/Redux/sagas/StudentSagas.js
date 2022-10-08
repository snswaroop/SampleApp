import {call, put, take, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';

import { registerToQB } from '../../Utils/QBConfig'

const callStudentListApi = async() => {
    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get('/MlaUsers/GetMlaUsersByType/student', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });

    return {list: apiresult.data}
}

const addNewStudentApi = async(data) => {

    const token = await ReadFromStorage(TOKEN)

    const bodyInfo = JSON.stringify(data.data);
    // data: data.data
    const addApiResponse = await APIProvider.post('/MlaUsers/AddMlaUser', bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: bodyInfo
    })

    if (addApiResponse.status === 200) {
        let pwd = data.data.password + "Fe@12E"
        var qbDetails = await registerToQB(data.data.firstName + " " + data.data.lastName , data.data.emailId, data.data.userName, pwd, data.data.telephone, "Student")
        //send this info to server

        var getUserInfo = await APIProvider.get(`/MlaUsers/GetMlaUserByName/${data.data.userName}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if (getUserInfo.status === 200) {
            //update QB id to FE server

            await APIProvider.put(`/MlaTasks/UpdateMlaUserWithQuickId/${getUserInfo.data.id}/${qbDetails.id}`, bodyInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
        }
    }


    return {response: addApiResponse.data, qbInfo: qbDetails}

}

const updateStudentInfoApiCall = async (data) => {
    const bodyInfo = JSON.stringify(data.data.values);
    const token = await ReadFromStorage(TOKEN)

    const updateApiResponse = await APIProvider.put(`/MlaUsers/UpdateMlaUser/${data.data.id}`, bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return {response: updateApiResponse.data}

}

const FetchQBIdOfStudent = async(data) => {
    const token = await ReadFromStorage(TOKEN)

    const fetchQBId = await APIProvider.get(`MlaTasks/GetUserQuickId/${data.id}/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    console.log(fetchQBId)
    return fetchQBId.data
}

function* addNewStudent(data) {
    try {
        const newStudentResponse = yield call(addNewStudentApi, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'ADDING_NEW_STUDENT', payload: newStudentResponse})
        yield put ({type: 'UPDATE_QB_ID', payload: studentsList.qbInfo})
    }
    catch(error) {
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

function* fetchStudentList(data) {
    try {
        const studentsList = yield call(callStudentListApi)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: ''}})
        yield put({type: 'LIST_STUDENT', list: studentsList.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

function* updateStudentInfo(data) {
    try {
        const updatedResponse = yield call(updateStudentInfoApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'UPDATED_STUDENT_RESPONSE', payload: updatedResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

const deleteStudentApiCall = async (data) => {
    const token = await ReadFromStorage(TOKEN)

    const deleteApiResponse = await APIProvider.delete(`MlaUsers/DeleteMlaUser/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return {response: deleteApiResponse.data}

} 

function* deleteStudent(data) {
    try {
        const deleteResponse = yield call(deleteStudentApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put({type: 'DELETED_STUDENT_DESPONSE', payload: deleteResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
    }
}

function* getQBId(data) {
    try {
        const fetStudentQBId = yield call(FetchQBIdOfStudent, data)
        yield put({type: 'UPDATE_STUDENT_QB', payload: fetStudentQBId})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
    }
}

function* studentSagas() {
    yield takeEvery("LIST_ALL_STUDENT", fetchStudentList)
    yield takeEvery("ADD_NEW_STUDENT_API_CALL", addNewStudent)
    yield takeEvery('UPDATE_STUDENT_INFO', updateStudentInfo)
    yield takeEvery('DELETE_STUDENT', deleteStudent)
    yield takeEvery('GET_STUDENT_QBID', getQBId)
}

export default studentSagas;