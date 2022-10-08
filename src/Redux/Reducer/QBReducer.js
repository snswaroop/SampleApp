const QBinitialState = {
    token: '',
    userId: '',

}

const QBReducer = (state = QBinitialState, action) => {
    switch(action.type) {
        case 'UPDATE_QB_ID':
            return {...state, userId: action.payload.id}
    }
    return state
}

export default QBReducer;