const initialState = {
    isMobile: false
}

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'IS_MOBILE':
        newState = Object.assign({}, state, {
            isMobile: action.payload,
        })
        return newState;
    default:
        return state;
    }
}