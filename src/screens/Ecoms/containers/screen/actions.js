import { client } from '../../../../core/client';

export const getEcom = (id) => {
    return(dispatch) => {
        return dispatch({
            type:'GET_ECOM_BY_ID',
            payload: client.ecom.get(id)
        })
    }
}
export const setEcomPhoto = (val) => {
    return(dispatch) => {
        return dispatch({
            type:'SET_ECOM_PHOTO',
            payload: val
        })
    }
}
export const updateEcomPhoto = (id, formData) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_ECOM_PHOTO',
            payload: client.ecom.uploadLogo(id, formData)
        })
    }
};
