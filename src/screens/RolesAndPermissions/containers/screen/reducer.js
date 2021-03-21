const initialState = {
    permissions: {},
    loading: true
}
export default (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'GET_ALL_PERMISSIONS_PENDING':
        newState = Object.assign({}, state, {
            loading: true
        })
        return newState;
    case 'GET_ALL_PERMISSIONS_FULFILLED':
            
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                permissions: action.payload,
                loading:false
            })
            return newState;
        }
        else {
            newState = Object.assign({}, state, {
                loading: false
            })
            return newState;
        }
    default:
        return state;
    }
}