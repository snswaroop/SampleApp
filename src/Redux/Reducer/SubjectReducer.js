
const initialState = {
    subjectList: [],
    subjectId: 0,
    title: '',
    description: '',
    subjectTerm: '',
    subjectType: '',
    mailingAlias: '',
    instructor: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    duration: '',
    audioEnabled: '',
    videoEnabled: '',
    instructorNavigation: '',
    isResponseSuccess: false,

}


const SubjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_SUBJECT':
            return { ...state, subjectList: action.list, isResponseSuccess: false }

        case 'ADD_SUBJECT':
            return { ...state, [action.payload.key]: action.payload.value}
        
        case 'UPDATE_SUBJECT': {
            return { ...state, [action.payload.key]: action.payload.value}
        }

        case 'ADDING_NEW_SUBJECT':
            return state;

        case 'UPDATED_SUBJECT_RESPONSE':
            return state;

        case 'DELETED_SUBJECT_DESPONSE':
            return {...state, isResponseSuccess: true};

        case 'UPDATE_SUBJECT_STATES':
            return {...state, subjectId: action.payload.subjectId, title: action.payload.title, description: action.payload.description, 
                subjectTerm: action.payload.subjectTerm, subjectType: action.payload.subjectType, mailingAlias: action.payload.mailingAlias, 
                instructor: action.payload.instructor, startDate: action.payload.startDate, endDate: action.payload.endDate, 
                startTime: action.payload.startTime, endTime: action.payload.endTime, duration: action.payload.duration,
                audioEnabled: action.payload.audioEnabled, videoEnabled: action.payload.videoEnabled, instructorNavigation: action.payload.instructorNavigation
            }
        case 'EMPTY_DETAILS':
            return {...state, subjectId: 0, title: '', description: '', instructor: ''}
    }

    return state;
}

export default SubjectReducer;