import { client } from '../../../../../../core/client';


export const deleteEcom = (ecomId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_ECOM',
            payload: client.ecom.delete(ecomId)
        })
    }
};
