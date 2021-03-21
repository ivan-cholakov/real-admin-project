const initialState = {
    validationErrors : { contact: {}}
}
export const Validation = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_VALIDATION_ERRORS':
        newState = Object.assign({}, state, {
            validationErrors: action.payload
        })
        return newState;
    case 'RESET_VALIDATION_ERRORS':
        newState = Object.assign({}, state, {
            validationErrors: initialState.validationErrors
        })
        return newState;
    default:
        return state;
    }
}