import { client } from '../../../../core/client';


export const createProduct = (product) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_PRODUCT',
            payload: client.product.create(product)
        })
    }
};
export const updateProduct = (product) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_PRODUCT',
            payload: client.product.update(product)
        })
    }
};
export const uploadProductCertificates = (id, certificates) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPLOAD_PRODUCT_CERTIFICATES',
            payload: client.product.uploadCertificates(id, certificates)
        })
    }
};
export const getProductCertificates = (productId) => {
    return (dispatch) => {
        return dispatch({
            type: 'GET_PRODUCT_CERTIFICATES',
            payload: client.product.getCertificates(productId)
        })
    }
};

export const updateProductGallery = (formData) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_BRAND_GALLERY',
            payload: client.product.uploadImages(formData)
        })
    }
};
