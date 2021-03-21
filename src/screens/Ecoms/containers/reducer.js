const initialState = {
    ecomData: { contact: {} },
    ecomPhoto: ''
};
export const EcomsPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_ECOM_PHOTO':
        newState = Object.assign({}, state, {
            ecomPhoto: action.payload
        });
        return newState;
    case 'GET_ECOM_BY_ID_PENDING':
        //also reset the ecom photo since this might be an edit.
        newState = Object.assign({}, state, {
            ecomData: initialState.ecomData
        });
        return newState;
    case 'GET_ECOM_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                ecomData: action.payload
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
