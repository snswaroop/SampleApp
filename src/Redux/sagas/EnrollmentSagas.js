import {call, put, take, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';


const getUnenrolledStudentsApiCall = async (data) => {
    // console.log(data)
    // console.log('data.data')

    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get(`/MlaEnrolls/GetStudentsToEnroll/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });
    return {list: apiresult.data}
}

const getEnrolledStudentsApiCall = async (data) => {

    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get(`/MlaEnrolls/GetStudentsEnrolled/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });
    return {list: apiresult.data}
}

const addNewSubjectApi = async(data) => {

    console.log(data)
    const token = await ReadFromStorage(TOKEN)

    const bodyInfo = JSON.stringify(data.data);
    // data: data.data
    const addApiResponse = await APIProvider.post(`/MlaEnrolls/EnrollStudent/${data.payload.id}/${data.payload.studentId}`, bodyInfo, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: bodyInfo
    })

    return {response: addApiResponse.data}

}

const removeStudentsApi = async(data) => {

    console.log(data)
    const token = await ReadFromStorage(TOKEN)

    const bodyInfo = JSON.stringify(data.data);
    // data: data.data
    const addApiResponse = await APIProvider.post(`/MlaEnrolls/DeEnrollStudents/${data.payload.id}/${data.payload.studentId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: bodyInfo
    })


    return {response: addApiResponse.data}

}

function* fetchUnEnrolledStudents(data) {
    try {
        // console.log('data ids => '+data[0].id)
        const unenrolledStudentsList = yield call(getUnenrolledStudentsApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: ''}})
        yield put({type: 'LIST_UNENROLLED_STUDENTS', list: unenrolledStudentsList.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
        console.log('error')
    }
}

function* fetchEnrolledStudents(data) {
    try {
        // console.log('data ids => '+data[0].id)
        const enrolledStudentsList = yield call(getEnrolledStudentsApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: ''}})
        yield put({type: 'LIST_ENROLLED_STUDENTS', list: enrolledStudentsList.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
        console.log('error')
    }
}

function* addEnrollStudents(data) {
    try {
        const newSubjectResponse = yield call(addNewSubjectApi, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'ENROLL_STUDENTS_LIST', payload: newSubjectResponse})
    }
    catch(error) {
        console.log(error)
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

function* removeEnrollStudents(data) {
    try {
        const newSubjectResponse = yield call(removeStudentsApi, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Removed Successfully'}})
        yield put({type: 'DEENROLL_STUDENTS_LIST', payload: newSubjectResponse})
    }
    catch(error) {
        console.log(error)
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

function* enrollmentSagas() {
    yield takeEvery("LIST_ALL_UNENROLLED_STUDENTS", fetchUnEnrolledStudents)
    yield takeEvery("ENROLL_STUDENTS", addEnrollStudents)
    yield takeEvery("LIST_ALL_ENROLLED_STUDENTS", fetchEnrolledStudents)
    yield takeEvery("DEENROLL_STUDENTS", removeEnrollStudents)
}

export default enrollmentSagas;