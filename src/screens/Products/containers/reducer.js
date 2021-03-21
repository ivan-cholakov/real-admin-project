const initialState = {
    productData: { },
    productPhoto: ''
};
export const ProductsPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_PRODUCT_PHOTO':
        newState = Object.assign({}, state, {
            productPhoto: action.payload
        });
        return newState;
    case 'SET_CURRENT_PRODUCT':
        newState = Object.assign({}, state, {
            productData: action.payload
        });
        return newState;
    case 'GET_PRODUCT_BY_ID_PENDING':
        //also reset the company photo since this might be an edit.
        newState = Object.assign({}, state, {
            productData: initialState.productData
        });
        return newState;
    case 'GET_PRODUCT_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                productData: action.payload
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
