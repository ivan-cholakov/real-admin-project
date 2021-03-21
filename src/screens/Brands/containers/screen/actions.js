import { client } from '../../../../core/client';

export const getBrand = id => {
    return dispatch => {
        return dispatch({
            type: 'GET_BRAND_BY_ID',
            payload: client.brand.get(id)
        });
    };
};

export const setBrandPhoto = val => {
    return dispatch => {
        return dispatch({
            type: 'SET_BRAND_PHOTO',
            payload: val
        });
    };
};

export const updateBrandGallery = formData => {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_BRAND_GALLERY',
            payload: client.brand.uploadImages(formData)
        });
    };
};
export const updateBrandImage = formData => {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_BRAND_COVER',
            payload: client.brand.uploadImage(formData)
        });
    };
};

export const deleteBrand = id => {
    return dispatch => {
        return dispatch({
            type: 'DELETE_BRAND_BY_ID',
            payload: client.brand.delete(id)
        });
    };
};

export const getCertificates = id => dispatch => {
    return dispatch({
        type: 'GET_BRAND_CERTIFICATES',
        payload: client.brand.getCertificates(id)
    });
};

/*
    this.type = source.type;
    this.description = source.description;
    this.startDate = source.startDate;
    this.endDate = source.endDate;
    this.brandId = source.brandId;
    this.ownerId = source.ownerId;
    this.ownerType = source.ownerType;
    this.file = source.file; 
    */

export const createCertificate = (brandId, certificates) => dispatch =>
    dispatch({
        type: 'CREATE_BRAND_CERTIFICATE',
        payload: client.brand.uploadCertificates(brandId, certificates)
    });

export const updateCertificate = (brandId, certificates) => dispatch =>
    dispatch({
        type: 'UPDATE_BRAND_CERTIFICATES',
        payload: client.brand.uploadCertificates(brandId, certificates)
    });

export const deleteCertificate = (brandId, certificates) => dispatch =>
    dispatch({
        type: 'DELETE_BRAND_CERTIFICATES',
        payload: client.brand.uploadCertificates(brandId, certificates)
    });
