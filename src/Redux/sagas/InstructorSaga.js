import {call, put, take, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';
import { registerToQB } from '../../Utils/QBConfig'


// arrow function for listing all the instructors
const callInstructorAPIList = async () => {
    const token = await ReadFromStorage(TOKEN)
    let apiResponse = await APIProvider.get('/MlaUsers/GetMlaUsersByType/instructor', {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    
    return apiResponse.data
}

// arrow fnction for adding instructors
const AddInstructorAPICall = async (data) => {

    
    const token = await ReadFromStorage(TOKEN)

    const bodyInfo = JSON.stringify(data.data);
    
    const addApiResponse = await APIProvider.post('/MlaUsers/AddMlaUser', bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: bodyInfo
    })

    if (addApiResponse.status === 200) {
        let pwd = data.data.password + "Fe@12E"
        var qbDetails = await registerToQB(data.data.firstName + " " + data.data.lastName , data.data.emailId, data.data.userName, pwd, data.data.telephone, "Instructor")
        

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

const FetchQBIdOfIns = async(data) => {
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

const deleteAdminApiCall = async (data) => {
    const token = await ReadFromStorage(TOKEN)

    const deleteAPIResponse = await APIProvider.delete(`MlaUsers/DeleteMlaUser/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })

    return {response: deleteAPIResponse.data}
}

const updateInstructorInfoApiCall = async (data) => {
    
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

const fetchSubjectByInstructor = async (data) => {
    const token = await ReadFromStorage(TOKEN)

    const fetchSubjectForInstructor = await APIProvider.get(`/MlaSubjects/GetSubjectsByInstructorId/${data.data}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return {response: fetchSubjectForInstructor.data}
}


function* fetchInstructorsList() {
    try {
        let apiResponse = yield call(callInstructorAPIList)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: ''}})
        yield put({type: 'INSTRUCTORS_LIST_RESPONSE', payload: apiResponse})
    }
    catch (error) {
        yield put({type: 'ERROR'})
    }
}

function* postAddInstructor(data) {
    try {
        const newInstructorResponse = yield call(AddInstructorAPICall, data)
        console.log(newInstructorResponse)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'ADDING_NEW_INSTRUCTOR_RESPONSE', payload: newInstructorResponse})
        yield put ({type: 'UPDATE_QB_ID', payload: newInstructorResponse.qbInfo})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        console.log(error)
    }
}

function* deleteInstructor(data) {
    try {
        const deleteInstructorResponse = yield call(deleteAdminApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Deleted Successfully'}})
        yield put({type: 'DELETE_INSTRUCTOR_RESPONSE', payload: deleteInstructorResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        console.log(error)
    }
}

function* updateInstructorInfo(data) {
    try {
        const updatedResponse = yield call(updateInstructorInfoApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Updated Successfully'}})
        yield put({type: 'UPDATED_ADMIN_RESPONSE', payload: updatedResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        console.log(error)
    }
}

function* getQBId(data) {
    try {
        const fetInsQBId = yield call(FetchQBIdOfIns, data)
        yield put({type: 'UPDATE_INS_QB', payload: fetInsQBId})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
    }
}

function* getSubjects(data) {
    try {
        const subjectByIns = yield call(fetchSubjectByInstructor, data)
        yield put({type: 'GET_SUBJECT_BY_INSTRUCTOR', payload: subjectByIns})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
    }
}

function* instructorSaga() {
    yield takeEvery('LIST_ALL_INSTRUCTORS', fetchInstructorsList)
    yield takeEvery('ADD_INSTRUCTOR_POST', postAddInstructor)
    yield takeEvery('DELETE_INSTRUCTOR', deleteInstructor)
    yield takeEvery('UPDATE_INSTRUCTOR_INFO', updateInstructorInfo)
    yield takeEvery('GET_INS_QBID', getQBId)
    yield takeEvery('GET_SUB_BY_INS_REQ', getSubjects)
}

export default instructorSaga;