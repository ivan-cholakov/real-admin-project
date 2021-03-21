const initialState = {
    notification: {}
}
const unexpectedError = {
    msg: 'An unexpected error has occured. Please try again later.', duration: 5, type: 'error'
}
export const Notification = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'TRIGGER_NOTIFICATION':
        newState = Object.assign({}, state, {
            notification: action.payload
        })
        return newState;
    case 'CLEAR_NOTIFICATION':
        newState = Object.assign({}, state, {
            notification: initialState.notification
        })
        return newState;
    case 'REGISTER_USER_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'LOGIN_USER_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'GET_PROFILE_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'SET_PROFILE_PICTURE_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'UPDATE_PROFILE_INFO_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'CHANGE_PASSWORD_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'FORGOTTEN_PASSWORD_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'VERIFY_TOKEN_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'PASSWORD_RECOVERY_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    case 'GET_COMPANIES_REJECTED':
        newState = Object.assign({}, state, {
            notification: unexpectedError
        })
        return newState;
    default:
        return state;
    }
}