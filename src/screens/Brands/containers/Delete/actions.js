import { client } from "../../../../core/client";


export const deleteBrand = (brandId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_BRAND',
            payload: client.brand.delete(brandId)
        })
    }
};