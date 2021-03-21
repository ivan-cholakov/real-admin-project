import { client } from '../../../../core/client';

export const getCompany = id => {
    return dispatch => {
        return dispatch({
            type: 'GET_COMPANY_BY_ID',
            payload: client.company.get(id)
        });
    };
};

export const getBatches = () => {
    return dispatch => {
        return dispatch({
            type: 'GET_BATCHES',
            payload: client.batch.list()
        });
    };
};

export const setCompanyPhoto = val => {
    return dispatch => {
        return dispatch({
            type: 'SET_COMPANY_PHOTO',
            payload: val
        });
    };
};
export const updateCompanyPhoto = formData => {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_COMPANY_PHOTO',
            payload: client.company.uploadLogo(formData)
        });
    };
};

export const createBatch = (batch, incentive) => {
    return dispatch => {
        return dispatch({
            type: 'CREATE_BATCH',
            payload: client.batch.create(batch, incentive)
        });
    };
};
export const updateBatch = (batch, incentive) => {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_BATCH',
            payload: client.batch.update(batch, incentive)
        });
    };
};

export const getBatchCount = productId => {
    return dispatch => {
        return dispatch({
            type: 'GET_BATCH_COUNT',
            payload: client.batch.count(productId)
        });
    };
};

export const deleteBatch = productId => {
    return dispatch => {
        return dispatch({
            type: 'DELETE_BATCH_COUNT',
            payload: client.batch.delete(productId)
        });
    };
};
