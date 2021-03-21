import { client } from '../../../../core/client';


export const createBrand = (brand) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_BRAND',
            payload: client.brand.create(brand)
        })
    }
};
export const updateBrand = (brand) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_BRAND',
            payload: client.brand.update(brand)
        })
    }
};