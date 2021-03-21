import { client } from '../../../../core/client';


export const updateCompany = (company) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_COMPANY',
            payload: client.company.update(company)
        })
    }
};