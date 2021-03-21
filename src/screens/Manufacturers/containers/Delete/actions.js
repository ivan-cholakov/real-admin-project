import { client } from '../../../../../../core/client';


export const deleteManufacturer = (manufacturerId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_MANUFACTURER',
            payload: client.manufacturer.delete(manufacturerId)
        })
    }
};
