const initialState = {
    collapsed: true,
    selected: null,
    adminOverlay: false,
    adminSelected: null
}

export const SideNavigation = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'EXPAND_MENU':
        newState = Object.assign({}, state, {
            collapsed: false,
        })
        return newState;
    case 'COLLAPSE_MENU':
        newState = Object.assign({}, state, {
            collapsed: true,
        })
        return newState;
    case 'CHANGE_SELECTED_ADMIN':
        newState = Object.assign({}, state, {
            adminSelected: action.payload,
            selected:null
        })
        return newState;
    case 'TRIGGER_ADMIN':
        newState = Object.assign({}, state, {
            adminOverlay: action.payload
        })
        return newState;
    case 'CHANGE_ACTIVE':
        newState = Object.assign({}, state, {
            selected: action.payload,
            adminSelected: null
        })
        return newState;
    case 'CHANGE_ACTIVE_NONE':
        newState = Object.assign({}, state, {
            selected: null,
            adminSelected: null
        })
        return newState;
    default:
        return state;
    }
}