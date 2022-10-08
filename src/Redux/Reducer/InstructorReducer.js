const initialState = {
    instructorsList: [],
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
    subjectList: []
}

const InstructorReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'INSTRUCTORS_LIST_RESPONSE':
            return { ...state, instructorsList: action.payload }

        case 'ADD_INSTRUCTOR':
            return { ...state, [action.payload.key]: action.payload.value }

        case 'UPDATE_INSTRUCTOR': {
            return { ...state, [action.payload.key]: action.payload.value }
        }

        case 'ADDING_NEW_INSTRUCTOR_RESPONSE':
            return state;

        case 'UPDATE_INS_QB':
            return { ...state }

        case 'UPDATE_INSTRUCTORS_STATES':
            return { ...state, id: action.payload.id, userName: action.payload.userName, firstName: action.payload.firstName, lastName: action.payload.lastName, telephone: action.payload.telephone, emailId: action.payload.emailId, aliasMailId: action.payload.aliasMailId, skypeId: action.payload.skypeId, password: action.payload.password, address: action.payload.address }

        case 'GET_SUBJECT_BY_INSTRUCTOR':
            return {...state, subjectList: action.payload.response}

    }

    return state;
}

export default InstructorReducer;