
const initialState = {
    enrollmentList: [],
    id: 0,
    userName: '',
    password: '',
    userType: '',
    firstName: '',
    lastName: '',
    emailId: '',
    telephone: '',
    aliasMailId: '',
    address: '',
    skypeId: '',
    quickId: '',
    mlaEnroll: [],
    mlaGradeInstructorNavigation: [],
    mlaGradeStudentNavigation: [],
    mlaSchedule: [],
    mlaSubject: [],
    isResponseSuccess: false,
}

const EnrollmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_UNENROLLED_STUDENTS':
            return { ...state, enrollmentList: action.list, isResponseSuccess: false }

        case 'ENROLL_STUDENTS_LIST':
            return { ...state, enrollmentList: action.list, isResponseSuccess: false }

        case 'LIST_ENROLLED_STUDENTS':
            return { ...state, enrollmentList: action.list, isResponseSuccess: false }

        case 'DEENROLL_STUDENTS_LIST':
            return { ...state, enrollmentList: action.list, isResponseSuccess: false }    
    }

    return state;
}

export default EnrollmentReducer;