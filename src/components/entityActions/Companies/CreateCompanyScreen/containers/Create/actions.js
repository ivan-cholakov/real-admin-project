import { client } from '../../../../../../core/client';


export const createCompany = (company) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_COMPANY',
            payload: client.company.create(company)
        })
    }
};

export const updateCompany = (company) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_COMPANY',
            payload: client.company.update(company)
        })
    }
};
export const updateCompanyPhoto = (formData) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_COMPANY_PHOTO',
            payload: client.company.uploadLogo(formData)
        })
    }
};