const initialLoginState = {
    authToken: '',
    errorMessage: '',
    isLoading: false,
    user: {},
    qbApplicationId: '',
    qbUserId: '',
    qbToken: '',

}

const loginReducer = (state = initialLoginState, action) => {

    switch(action.type) {
        case 'AUTH_TOKEN':
            return {...state, authToken: action.payload.token, error: ''};

        case 'SHOW_PROGRESS':
            return {...state, isLoading: true}

        case 'HIDE_PROGRESS':
            return {...state, isLoading: false}
        
         case 'ERROR_MESSAGE':
            return {...state, errorMessage: action.error, authToken: ''}   

        case 'USER_DETAILS':
            return {...state, user: action.payload.userInfo}
        
        case 'QB_INFO':
            return {...state, qbApplicationId: action.payload.session.applicationId, qbUserId: action.payload.user.id, qbToken:action.payload.session.token, user: action.payload.user}
    }
    return state
}

export default loginReducer;