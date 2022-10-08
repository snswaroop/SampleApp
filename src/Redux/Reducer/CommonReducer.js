const initialState = {
    isError: false,
    errorMessage: '',
    successMessage: '',
    isLoading: false,

}


const CommonReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ERROR':
            return {...state, isError: true, errorMessage: action.payload.errorMessage, successMessage: '', isLoading: false}
        case 'SUCCESS':
            return {...state, isError: false, errorMessage: '', successMessage: action.payload.message, isLoading: false}
        case 'LOADING':
            return {...state, isLoading: true}
        case 'STOP_LOADING':
            return {...state, isLoading: false}
        case 'INVALID_PASSWORD':
            return {...state, errorMessage: 'Invalid password'}
        case 'DISABLE_ERROR':
            return {...state, errorMessage: ''}
        case 'INVALID_EMAIL':
            return {...state, errorMessage: 'Invalid email Id'}
        case 'INVALID_ALAIS':
            return {...state, errorMessage: 'Invalid Alternative email id'}
        case 'INVALID_PHONE':
            return {...state, errorMessage: 'Invalid Phone number'}
        case 'INVALID_USER_NAME':
            return {...state, errorMessage: 'Invalid User Name'}
        case 'INVALID_FIRST_NAME':
            return {...state, errorMessage: 'Invalid First Name'}
        case 'INVALID_ADDRESS':
            return {...state, errorMessage: 'Invalid Address'}
        case 'SELECT_INSTRUCTOR':
            return {...state, errorMessage: 'Please Select the Instructor'}
        case 'INVALID_DESC':
            return {...state, errorMessage: 'Invalid Description'}
        case 'INVALID_TITLE':
            return {...state, errorMessage: 'Invalid Title'}

    }
    return state
}


export default CommonReducer;