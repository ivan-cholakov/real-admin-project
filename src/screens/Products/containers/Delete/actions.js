import { client } from '../../../../../../core/client';


export const deleteProduct = (productId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_PRODUCT',
            payload: client.product.delete(productId)
        })
    }
};