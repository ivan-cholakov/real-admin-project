import { client } from "../../../../core/client";


export const updateBrand = (brand) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_BRAND',
            payload: client.brand.update(brand)
        })
    }
};