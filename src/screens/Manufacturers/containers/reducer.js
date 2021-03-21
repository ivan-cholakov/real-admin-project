const initialState = {
    manufacturerData: { contact: {} },
    manufacturerPhoto: ''
};
export const ManufacturersPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_MANUFACTURER_PHOTO':
        newState = Object.assign({}, state, {
            manufacturerPhoto: action.payload
        });
        return newState;
    case 'GET_MANUFACTURER_BY_ID_PENDING':
        //also reset the company photo since this might be an edit.
        newState = Object.assign({}, state, {
            manufacturerData: initialState.manufacturerData
        });
        return newState;
    case 'GET_MANUFACTURER_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                manufacturerData: action.payload
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
