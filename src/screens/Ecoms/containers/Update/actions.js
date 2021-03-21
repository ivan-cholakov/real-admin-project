import { client } from '../../../../core/client';


export const updateEcom = (ecom) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_ECOM',
            payload: client.ecom.update(ecom)
        })
    }
};
