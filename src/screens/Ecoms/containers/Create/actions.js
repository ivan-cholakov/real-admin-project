import { client } from '../../../../core/client';


export const createEcom = (ecom) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_ECOM',
            payload: client.ecom.create(ecom)
        })
    }
};
