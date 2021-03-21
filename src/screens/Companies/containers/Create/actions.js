import { client } from '../../../../core/client';


export const createCompany = (company) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_COMPANY',
            payload: client.company.create(company)
        })
    }
};