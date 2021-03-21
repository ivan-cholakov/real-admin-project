import { client } from '../../../../core/client';


export const createManufacturer = (manufacturer) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_MANUFACTURER',
            payload: client.manufacturer.create(manufacturer)
        })
    }
};
