import { client } from '../../../../core/client';

export const triggerDrawer = (drawerData) => {
    return (dispatch) => {
        return dispatch({
            type: 'TRIGGER_DRAWER',
            payload: drawerData
        })
    }
};

export const getManufacturer = (id) => {
    return(dispatch) => {
        return dispatch({
            type:'GET_MANUFACTURER_BY_ID',
            payload: client.manufacturer.get(id)
        })
    }
};

export const setManufacturerPhoto = (val) => {
    return(dispatch) => {
        return dispatch({
            type:'SET_MANUFACTURER_PHOTO',
            payload: val
        })
    }
};

export const updateManufacturerPhoto = (id, formData) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_MANUFACTURER_PHOTO',
            payload: client.manufacturer.uploadLogo(id, formData)
        })
    }
};
