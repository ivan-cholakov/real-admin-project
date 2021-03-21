import { client } from '../../../../core/client';

export const triggerDrawer = (drawerData) => {
    return (dispatch) => {
        return dispatch({
            type: 'TRIGGER_DRAWER',
            payload: drawerData
        })
    }
};

export const getMaterial = (id) => {
    return(dispatch) => {
        return dispatch({
            type:'GET_MATERIAL_BY_ID',
            payload: client.material.get(id)
        })
    }
};

export const setMaterialPhoto = (val) => {
    return(dispatch) => {
        return dispatch({
            type:'SET_MATERIAL_PHOTO',
            payload: val
        })
    }
};

export const updateMaterialPhoto = (id, formData) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_MATERIAL_PHOTO',
            payload: client.material.uploadLogo(id, formData)
        })
    }
};
