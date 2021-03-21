const initialState = {
    drawerInfo: {},
    type: ''
};
export const DrawerReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'OPEN_DRAWER':
        newState = Object.assign({}, state, {
            drawerInfo: action.payload
        });
        return newState;
    case 'SET_DRAWER_COMPONENT_TYPE': 
        newState = Object.assign({}, state, {
            type: action.payload
        });
        return newState;
    case 'CLOSE_DRAWER':
        newState = Object.assign({}, state, {
            drawerInfo: {}
        });
        return newState;
    default:
        return state;
    }
};
