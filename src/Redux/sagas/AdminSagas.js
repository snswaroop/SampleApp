import {call, put, take, takeEvery} from 'redux-saga/effects';
import APIProvider from '../../Utils/APIProvider';
import {ReadFromStorage} from '../../Utils/StorageUtils';
import {TOKEN} from '../../Utils/Constants';
import { registerToQB } from '../../Utils/QBConfig'


const callAdminListApi = async() => {
    const token = await ReadFromStorage(TOKEN)
    const apiresult = await APIProvider.get('/MlaUsers/GetMlaUsersByType/admin', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        
    });

    return {list: apiresult.data}
}

const addNewAdminApi = async(data) => {

    //command starts here
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

    if (addApiResponse.status == 200) {
        let pwd = data.data.password + "Fe@12E"
        var qbDetails = await registerToQB(data.data.firstName + " " + data.data.lastName , data.data.emailId, data.data.userName, pwd, data.data.telephone, "Admin")
        
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

    //command ends here
        //send this info to Project FE server
        // console.log(addApiResponse.data)

        // const addQbInfoToFe = await APIProvider.post(`/MlaTasks/UpdateMlaUserWithQuickId/32/${qbDetails.id}`, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`,
        //         "Content-Type": "application/json"
        //     },
        // })

        // console.log(addQbInfoToFe)

        //enable this also
    }




    return {response: addApiResponse.data, qbInfo: qbDetails}

}

const updateAdminInfoApiCall = async (data) => {

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

const FetchQBIdOfAdmin = async(data) => {
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

function* addNewAdmin(data) {
    try {
        const newAdminResponse = yield call(addNewAdminApi, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'ADDING_NEW_ADMIN', payload: newAdminResponse})
        yield put ({type: 'UPDATE_QB_ID', payload: newAdminResponse.qbInfo})
    }
    catch(error) {
        console.log(error)
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
    }
}

function* fetchAdminList(data) {
    try {
        const adminsList = yield call(callAdminListApi)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: ''}})
        yield put({type: 'LIST_ADMIN', list: adminsList.list})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
    }
}

function* updateAdminInfo(data) {
    try {
        const updatedResponse = yield call(updateAdminInfoApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'SUCCESS', payload: {message: 'Added Successfully'}})
        yield put({type: 'UPDATED_ADMIN_RESPONSE', payload: updatedResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        yield put ({type: 'ERROR', payload: {errorMessage: 'Try Again'}})
        console.log(error)
    }
}

const deleteAdminApiCall = async (data) => {
    const token = await ReadFromStorage(TOKEN)

    const deleteApiResponse = await APIProvider.delete(`MlaUsers/DeleteMlaUser/${data.id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return {response: deleteApiResponse.data}

} 

function* deleteAdmin(data) {
    try {
        const deleteResponse = yield call(deleteAdminApiCall, data)
        yield put ({type: 'STOP_LOADING'})
        yield put({type: 'DELETED_ADMIN_DESPONSE', payload: deleteResponse})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
        console.log(error)
    }
}

function* getQBId(data) {
    try {
        const fetAdminQBId = yield call(FetchQBIdOfAdmin, data)
        yield put({type: 'UPDATE_ADMIN_QB', payload: fetAdminQBId})
    }
    catch(error) {
        yield put ({type: 'STOP_LOADING'})
    }
}

function* adminSagas() {
    yield takeEvery("LIST_ALL_ADMIN", fetchAdminList)
    yield takeEvery("ADD_NEW_ADMIN_API_CALL", addNewAdmin)
    yield takeEvery('UPDATE_ADMIN_INFO', updateAdminInfo)
    yield takeEvery('DELETE_ADMIN', deleteAdmin)
    yield takeEvery('GET_ADMIN_QBID', getQBId)
    
}

export default adminSagas;