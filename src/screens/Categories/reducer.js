const initialState = {
    categories: []
};
export const Categories = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'FETCH_CATEGORIES_FULFILLED':
        if (!action.payload.error) {
            return { ...state, categories: action.payload.data };
        }
        return state;
    case 'GET_COMPANY_BY_ID_PENDING':
        //also reset the company photo since this might be an edit.
        newState = Object.assign({}, state, {
            companyData: initialState.companyData
        });
        return newState;
    case 'GET_COMPANY_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                companyData: action.payload
            });
            return newState;
        } else {
            return state;
        }
    default:
        return state;
    }
};
