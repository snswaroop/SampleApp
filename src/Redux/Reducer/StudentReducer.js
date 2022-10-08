
const initialState = {
    studentList: [],
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


const StudentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_STUDENT':
            return { ...state, studentList: action.list, isResponseSuccess: false }

        case 'ADD_STUDENT':
            return { ...state, [action.payload.key]: action.payload.value }

        case 'UPDATE_STUDENT': {
            return { ...state, [action.payload.key]: action.payload.value }
        }

        case 'ADDING_NEW_STUDENT':
            return state;

        case 'UPDATED_STUDENT_RESPONSE':
            return state;

        case 'DELETED_STUDENT_DESPONSE':

            return { ...state, isResponseSuccess: true };

        case 'UPDATE_STUDENT_QB':
            return { ...state }

        case 'UPDATE_STUDENT_STATES':
            return { ...state, id: action.payload.id, userName: action.payload.userName, firstName: action.payload.firstName, lastName: action.payload.lastName, telephone: action.payload.telephone, emailId: action.payload.emailId, aliasMailId: action.payload.aliasMailId, skypeId: action.payload.skypeId, password: action.payload.password, address: action.payload.address }
    }

    return state;
}

export default StudentReducer;