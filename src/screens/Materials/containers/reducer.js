const initialState = {
    materialData: { contact: {} },
    materialPhoto: ''
};
export const MaterialsPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_MATERIAL_PHOTO':
        newState = Object.assign({}, state, {
            materialPhoto: action.payload
        });
        return newState;
    case 'GET_MATERIAL_BY_ID_PENDING':
        //also reset the company photo since this might be an edit.
        newState = Object.assign({}, state, {
            materialData: initialState.materialData
        });
        return newState;
    case 'GET_MATERIAL_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                materialData: action.payload
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
