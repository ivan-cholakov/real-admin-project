const initialState = {
    stockistData: {
        displayName: 'FACT-LIME-Stokist-1.1-DD-MM-YY'
    },
};

export const StockistsPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_STOCKIST':
        newState = Object.assign({}, state, {
            stockistData: action.payload
        });
        return newState;
    case 'GET_STOCKIST_BY_ID_PENDING':
        //also reset the stockist photo since this might be an edit.
        newState = Object.assign({}, state, {
            stockistData: initialState.stockistData
        });
        return newState;
    case 'GET_STOCKIST_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                stockistData: action.payload
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
