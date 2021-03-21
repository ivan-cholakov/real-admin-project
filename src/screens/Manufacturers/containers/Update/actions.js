import { client } from '../../../../core/client';


export const updateManufacturer = (manufacturer) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_MANUFACTURER',
            payload: client.manufacturer.update(manufacturer)
        })
    }
};
