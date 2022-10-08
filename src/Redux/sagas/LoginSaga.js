import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage, WriteToStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';
import {useDispatch} from 'react-redux'

const getAuthorizationToken = async (data) => {
    // return axios call
    try {
    const token = await APIProvider.post('/MlaLogin/AuthenticateUser', { UserName: data.payload.UserName,  Password: data.payload.Password})
                  await WriteToStorage(TOKEN, token.data)

    return {token: token.data}
    }
    catch (error) {
        return {error: "Invalid Credentials"}
    }
}

const callUserInfo = async (data) => {
    const token = await ReadFromStorage(TOKEN);
    const userInfo = await APIProvider.get(`/MlaUsers/GetMlaUserByName/${data.payload.login}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return {userInfo: userInfo.data}
} 

function* fetchUserInfo(data) {
    try {
        const userInfo = yield call(callUserInfo, data)
        yield put ({type: 'STOP_LOADING'})
        yield put({type: "USER_DETAILS", payload: userInfo})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        return {error: "Invalid Credentials"}
    }
}

function* fetchAuthorizationToken(action) {
    try  {
        const token = yield call(getAuthorizationToken, action);
        yield put({type: 'HIDE_PROGRESS', payload: {isVisible: false}})
        yield put({type: 'AUTH_TOKEN', payload: token})
    }
    catch(e) {
        yield put({token: 'FAILED', payload: e.message})
    }
}

function* loginSaga() {
    yield takeEvery('GET_TOKEN', fetchAuthorizationToken);
    yield takeEvery('USER_INFO', fetchUserInfo);
}

export default loginSaga;