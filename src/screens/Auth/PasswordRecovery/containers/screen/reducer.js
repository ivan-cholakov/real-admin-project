const initialState = {
    validToken: false,
    redirectToSignIn: false
}

export const PasswordRecovery = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_TOKEN_VALIDITY':
        newState = Object.assign({}, state, {
            validToken: action.payload
        })
        return newState;
    case 'SET_REDIRECT':
        newState = Object.assign({}, state, {
            redirectToSignIn: action.payload
        })
        return newState;
    default:
        return state;
    }
}