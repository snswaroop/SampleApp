
const initialState = {
    adminList: [],
    id: 0,
    userName: '',
    firstName: '',
    lastName: '',
    telephone: '',
    emailId: '',
    aliasMailId: '',
    skypeId: '',
    password: '',
    address: '',
    isResponseSuccess: false,

}


const AdminReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LIST_ADMIN':
            return { ...state, adminList: action.list, isResponseSuccess: false }

        case 'ADD_ADMIN':
            return { ...state, [action.payload.key]: action.payload.value}
        
        case 'UPDATE_ADMIN': 
            return { ...state, [action.payload.key]: action.payload.value}
        

        case 'ADDING_NEW_ADMIN':
            return state;

        case 'UPDATED_ADMIN_RESPONSE':
            return state;

        case 'DELETED_ADMIN_DESPONSE':

            return {...state, isResponseSuccess: true};

        case 'UPDATE_ADMIN_QB':
            return {...state}

        case 'UPDATE_STATES':
            return {...state, id: action.payload.id, userName: action.payload.userName, firstName: action.payload.firstName, lastName: action.payload.lastName, telephone: action.payload.telephone, emailId: action.payload.emailId, aliasMailId: action.payload.aliasMailId, skypeId: action.payload.skypeId, password: action.payload.password, address: action.payload.address}
    }

    return state;
}

export default AdminReducer;