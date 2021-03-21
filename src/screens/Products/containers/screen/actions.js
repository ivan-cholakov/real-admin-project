import { client } from '../../../../core/client';
import { Config } from '../../../../core/config';

const config = new Config();

export const triggerDrawer = drawerData => {
    return dispatch => {
        return dispatch({
            type: 'TRIGGER_DRAWER',
            payload: drawerData
        });
    };
};

export const getProduct = id => {
    return dispatch => {
        return dispatch({
            type: 'GET_PRODUCT_BY_ID',
            payload: client.product.get(id)
        });
    };
};

export const getCurrentProduct = async id => {
    const baseUrl = config.getBaseUrl();
    const token = client.auth.getSessionToken();
    const {
        action: { payload }
    } = await client.product.get(id);
    const {
        action: {
            payload: { data }
        }
    } = await client.product.getCertificates(id);
    const res = await fetch(
        `${baseUrl}/storage${payload.mainImage}?token=${token}`
    );
    payload.mainImage = await res.blob();
    payload.certificates = data.map(c => {
    // in case of hyperlink the file url is ablsolute
        let attachment;
        let hyperlink;
        const r = new RegExp('^(?:[a-z]+:)?//', 'i');
        if (r.test(c.file)) {
            hyperlink = c.file;
        } else {
            attachment = c.file;
        }
        return {
            attachment,
            hyperlink,
            type: c.type,
            note: c.description
        };
    });
    setCurrentProduct(payload);
};

export const setCurrentProduct = payload => {
    return dispatch => {
        return dispatch({
            type: 'SET_CURRENT_PRODUCT',
            payload
        });
    };
};

export const setProductPhoto = val => {
    return dispatch => {
        return dispatch({
            type: 'SET_PRODUCT_PHOTO',
            payload: val
        });
    };
};

export const updateProductPhoto = formData => {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_PRODUCT_PHOTO',
            payload: client.product.uploadMainImage(formData)
        });
    };
};

export const deleteProduct = productId => {
    return dispatch => {
        return dispatch({
            type: 'DELETE_PRODUCT',
            payload: client.product.delete(productId)
        });
    };
};
