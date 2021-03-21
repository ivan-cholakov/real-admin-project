import { client } from '../../../../../../core/client';


export const deleteCompany = (companyId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_COMPANY',
            payload: client.company.delete(companyId)
        })
    }
};