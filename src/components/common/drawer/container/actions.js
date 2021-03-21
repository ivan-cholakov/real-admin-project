import {store} from '../../../../store';

export const openDrawer = (drawerData, componentType) => {
    const state = store.getState();
    const type = componentType ? componentType : 'entityAction';
    return (dispatch) => {
        let timeOut = 0;
        if(state.DrawerReducer.drawerInfo.title) {
            dispatch(closeDrawer());
            timeOut = 0;
        }
        dispatch(setDrawerComponentType(type));
        setTimeout( () => {
            dispatch({
                type: 'OPEN_DRAWER',
                payload: drawerData
            })}, timeOut)
    }
};

export const closeDrawer = () => {
    return (dispatch) => {
        return dispatch({
            type: 'CLOSE_DRAWER'
        })
    }
};

export const setDrawerComponentType = (type) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_DRAWER_COMPONENT_TYPE',
            payload: type
        })
    }
};
