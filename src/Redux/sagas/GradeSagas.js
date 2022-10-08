import {call, put, take, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';


const getTasksOfSubjectApiCall = async (data) => {
    // console.log(data)
    // console.log('data.data')

    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get(`/MlaTasks/GetTasksBySubject/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });
    return {list: apiresult.data}
}

function* fetchTasksOfSubject(data) {
    try {
        // console.log('data ids => '+data[0].id)
        const tasksList = yield call(getTasksOfSubjectApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: ''}})
        yield put({type: 'LIST_SUBJECT_TASKS', list: tasksList.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
        console.log('error')
    }
}

function* gradeSagas() {
    yield takeEvery("LIST_ALL_SUBJECT_TASKS", fetchTasksOfSubject)
}

export default gradeSagas;