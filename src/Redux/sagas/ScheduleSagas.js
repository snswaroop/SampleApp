import {call, put, take, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';

const getDisplayScheduleApiCall = async (data) => {
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

const getInProcessScheduleApiCall = async (data) => {
    // console.log(data)
    // console.log('data.data')

    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get(`/MlaTasks/GetInProcessTasksByAdmin/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });
    return {list: apiresult.data}
}

const updateStudentInfoApiCall = async (data) => {
    const bodyInfo = JSON.stringify(data.data.values);
    const token = await ReadFromStorage(TOKEN)

    const updateApiResponse = await APIProvider.put(`/MlaTasks/UpdateTask/${data.data.id}`, bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return {response: updateApiResponse.data}

}

const addNewScheduleApi = async(data) => {

    //command starts here
    const token = await ReadFromStorage(TOKEN)

    const bodyInfo = JSON.stringify(data.data);
    // data: data.data
    const addScheduleResponse = await APIProvider.post(`/MlaSchedule/AddSchedule/${data.data.id}`, bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: bodyInfo
    })

    return {response: addScheduleResponse.data}
}

const getScheduleBySubjectApiCall = async (data) => {
    // console.log(data)
    // console.log('data.data')

    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get(`/MlaSchedule/GetSubjectsToBeScheduleByAdmin`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });
    return {list: apiresult.data}
}

const deleteScheduleApiCall = async (data) => {
    console.log('data => '+data.id)
    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get(`/MlaSchedule/DeleteScheduleForSubject/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });
    return {list: apiresult}
}

function* getDisplaySchedules(data) {
    try {
        // console.log('data ids => '+data[0].id)
        const scheduleLists = yield call(getDisplayScheduleApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'List Successfull'}})
        yield put({type: 'LIST_DISPLAY_SCHEDULE', list: scheduleLists.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
        console.log('error')
    }
}

function* getInProcessSchedules(data) {
    try {
        // console.log('data ids => '+data[0].id)
        const scheduleLists = yield call(getInProcessScheduleApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'List Successfull'}})
        yield put({type: 'LIST_INPROCESS_SCHEDULE', list: scheduleLists.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
        console.log('error')
    }
}

function* updateStudentInfo(data) {
    try {
        const updatedResponse = yield call(updateStudentInfoApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'UPDATED_TASK_RESPONSE', payload: updatedResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

function* addNewSchedule(data) {
    try {
        const newScheduleResponse = yield call(addNewScheduleApi, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'ADDING_NEW_ADMIN', payload: newScheduleResponse})
    }
    catch(error) {
        console.log(error)
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Againn'}})
    }
}


function* getDisplaySchedulesByAdmin(data) {
    try {
        // console.log('data ids => '+data[0].id)
        const displayListsBySubjects = yield call(getScheduleBySubjectApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'List Successfull'}})
        yield put({type: 'LIST_SCHEDULES_BY_SUBJECT', list: displayListsBySubjects.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
        console.log('error')
    }
}

function* deleteSchedule(data) {
    try {
        console.log('data ids => deleted')
        const scheduleLists = yield call(deleteScheduleApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Delete Successfull'}})
        yield put({type: 'DELETE_SCHEDULE_TASK', list: scheduleLists.isResponseSuccess})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
        console.log('error')
    }
}

function* scheduleSagas() {
    yield takeEvery("LIST_ALL_DISPLAY_SCHEDULE", getDisplaySchedules)
    yield takeEvery("LIST_ALL_INPROCESS_SCHEDULE", getInProcessSchedules)
    yield takeEvery('ADD_UPDATE_TASK', updateStudentInfo)
    yield takeEvery("ADD_NEW_SCHEDULE_API_CALL", addNewSchedule)
    yield takeEvery("LIST_ALL_SCHEDULE_BY_ADMIN", getDisplaySchedulesByAdmin)
    yield takeEvery("DELETE_SCHEDULE", deleteSchedule)
}

export default scheduleSagas;