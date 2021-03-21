const initialState = {
    title: 'Almond Dashboard',
}

export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'CHANGE_TITLE':
        newState = Object.assign({}, state, {
            title: action.payload,
        })
        return newState;
    default:
        return state;
    }
}