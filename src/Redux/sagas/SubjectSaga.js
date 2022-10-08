import {call, put, take, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';

const callSubjectListApi = async() => {
    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get('/MlaSubjects/GetAllMlaSubjects', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });

    return {list: apiresult.data}
}

const addNewSubjectApi = async(data) => {

    const token = await ReadFromStorage(TOKEN)

    const bodyInfo = JSON.stringify(data.data);
    // data: data.data
    const addApiResponse = await APIProvider.post('/MlaSubjects/AddMlaSubject', bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: bodyInfo
    })


    return {response: addApiResponse.data}

}

const updateSubjectInfoApiCall = async (data) => {
    const bodyInfo = JSON.stringify(data.data.values);
    const token = await ReadFromStorage(TOKEN)

    const updateApiResponse = await APIProvider.put(`/MlaSubjects/UpdateMlaSubject/${data.data.id}`, bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return {response: updateApiResponse.data}

}

function* addNewSubject(data) {
    try {
        const newSubjectResponse = yield call(addNewSubjectApi, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'ADDING_NEW_SUBJECT', payload: newSubjectResponse})
    }
    catch(error) {
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

function* fetchSubjectList(data) {
    try {
        const subjectsList = yield call(callSubjectListApi)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: ''}})
        yield put({type: 'LIST_SUBJECT', list: subjectsList.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
    }
}

function* updateSubjectInfo(data) {
    try {
        const updatedResponse = yield call(updateSubjectInfoApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Updated Successfully'}})
        yield put({type: 'UPDATED_SUBJECT_RESPONSE', payload: updatedResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
    }
}

const deleteSubjectApiCall = async (data) => {
    const token = await ReadFromStorage(TOKEN)

    console.log(data)
    const deleteApiResponse = await APIProvider.delete(`/MlaSubjects/DeleteMlaSubject/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    console.log(deleteApiResponse)

    return {response: deleteApiResponse.data}

} 

function* deleteSubject(data) {
    console.log(data)
    try {
        const deleteResponse = yield call(deleteSubjectApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put({type: 'DELETED_SUBJECT_DESPONSE', payload: deleteResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        console.log(error)
    }
}

function* subjectSagas() {
    yield takeEvery("LIST_ALL_SUBJECT", fetchSubjectList)
    yield takeEvery("ADD_NEW_SUBJECT_API_CALL", addNewSubject)
    yield takeEvery('UPDATE_SUBJECT_INFO', updateSubjectInfo)
    yield takeEvery('DELETE_SUBJECT', deleteSubject)
    
}

export default subjectSagas;