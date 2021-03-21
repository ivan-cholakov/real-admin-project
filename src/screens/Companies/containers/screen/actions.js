import { client } from '../../../../core/client';

export const getCompany = (id) => {
    return(dispatch) => {
        return dispatch({
            type:'GET_COMPANY_BY_ID',
            payload: client.company.get(id)
        })
    }
}
export const setCompanyPhoto = (val) => {
    return(dispatch) => {
        return dispatch({
            type:'SET_COMPANY_PHOTO',
            payload: val
        })
    }
}
export const updateCompanyPhoto = (formData) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_COMPANY_PHOTO',
            payload: client.company.uploadLogo(formData)
        })
    }
};