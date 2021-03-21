import { client } from '../../../../core/client';


export const updateProduct = (product) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_PRODUCT',
            payload: client.product.update(product)
        })
    }
};
