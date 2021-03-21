import { client } from '../../../../core/client';

export const getScans = (productId, options) => {
    return (dispatch) => {
        return dispatch({
            type: 'GET_SCANS',
            payload: client.dashboard.scans(productId, options)
        })
    }
};

export const getSegmentation = (productId, options) => {
    return (dispatch) => {
        return dispatch({
            type: 'GET_SEGMENTATIONS',
            payload: client.dashboard.segmentation(productId, options)
        })
    }
};

export const getHeatmapData = (zoom, bbox, productId, options) => {
    return (dispatch) => {
        return dispatch({
            type: 'GET_HEATMAP_DATA',
            payload: client.dashboard.heatmap(zoom, bbox, productId, options)
        })
    }
};

export const setHeatmapField = (name, value) => {
    return {
        type: 'SET_HEATMAP_FIELD',
        payload: { name, value },
    }
}
export const setFiltersField = (name, value) => {
    return {
        type: 'SET_FILTERS_FIELD',
        payload: { name, value },
    }
}
export const listDashboardBatches = (productId, options) => {
    return {
        type: 'GET_DASHBOARD_BATCHES',
        payload: client.dashboard.list(productId, options)
    }
}