const initialState = {
    userData: { },
    userPhoto: ''
};
export const UsersPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_USER_PHOTO':
        newState = Object.assign({}, state, {
            userPhoto: action.payload
        });
        return newState;
    case 'GET_USER_BY_ID_PENDING':
        //also reset the company photo since this might be an edit.
        newState = Object.assign({}, state, {
            userData: initialState.userData
        });
        return newState;
    case 'GET_USER_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                userData: action.payload
            });
            return newState;
        }
        else {
            return state;
        }
    default:
        return state;
    }
}
