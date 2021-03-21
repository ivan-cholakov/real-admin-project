const initialState = {
    trailData: { contact: {} },
    trailPhoto: ''
};
export const TrailsPage = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'SET_TRAIL_PHOTO':
        newState = Object.assign({}, state, {
            trailPhoto: action.payload
        });
        return newState;
    case 'SET_TRAIL_DATA':
        newState = Object.assign({}, state, {
            trailData: action.payload
        });
        return newState;
    case 'GET_TRAIL_BY_ID_PENDING':
        //also reset the trail photo since this might be an edit.
        newState = Object.assign({}, state, {
            trailData: initialState.trailData
        });
        return newState;
    case 'GET_TRAIL_BY_ID_FULFILLED':
        if (!action.payload.error) {
            newState = Object.assign({}, state, {
                trailData: action.payload
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
