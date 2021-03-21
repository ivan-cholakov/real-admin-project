import { client } from '../../../../core/client';

export const getTrail = (id) => {
    return(dispatch) => {
        return dispatch({
            type:'GET_COMPANY_BY_ID',
            payload: client.trail.get(id)
        })
    }
}
export const setTrailPhoto = (val) => {
    return(dispatch) => {
        return dispatch({
            type:'SET_COMPANY_PHOTO',
            payload: val
        })
    }
}
export const updateTrailPhoto = (id, formData) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_COMPANY_PHOTO',
            payload: client.trail.uploadLogo(id, formData)
        })
    }
};
