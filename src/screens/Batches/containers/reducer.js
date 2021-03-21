const initialState = {
    companyData: { contact: {} },
    companyPhoto: ''
};
export const CompaniesPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_COMPANY_PHOTO':
        newState = Object.assign({}, state, {
            companyPhoto: action.payload
        });
        return newState;
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
        }
        else {
            return state;
        }
    default:
        return state;
    }
}
