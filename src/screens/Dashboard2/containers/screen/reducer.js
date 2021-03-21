import moment from 'moment';

const initialState = {
    filters: {
        productId: 'all',
        from: moment().subtract(1, 'month'),
        to: moment(),
    },
    scans : null,
    segmentation: null,
    batches: {
        meta: {},
        data: []
    },
    heatmap: {
        bounds: {
            zoom: 1.2,
            coordinates: [],
        },
        viewport: {
            latitude: 40,
            longitude: 0,
            zoom: 1.2,
            bearing: 0,
            pitch: 10,
        },
        searchValue: '',
        data: []
    }

}
export const Dashboard = (state = initialState, action) => {
    let newState;
    switch (action.type) {
    case 'GET_SCANS_FULFILLED':
        newState = Object.assign({}, state, {
            scans: action.payload
        })
        return newState
    case 'GET_SEGMENTATIONS_FULFILLED':
        newState = Object.assign({}, state, {
            segmentation: action.payload
        })
        return newState;
    case 'GET_HEATMAP_DATA_FULFILLED':
        newState = Object.assign({}, state, {
            heatmap: {
                ...state.heatmap,
                data: action.payload
            }
        })
        return newState;
    case 'GET_DASHBOARD_BATCHES_FULFILLED':
        newState = Object.assign({}, state, {
            batches: action.payload
        })
        return newState;
    case 'SET_HEATMAP_FIELD':
        newState = Object.assign({}, state, {
            heatmap: {
                ...state.heatmap,
                [action.payload.name]: action.payload.value
            }
        })
        return newState;
    case 'SET_FILTERS_FIELD':
        newState = Object.assign({}, state, {
            filters: {
                ...state.filters,
                [action.payload.name]: action.payload.value
            }
        })
        return newState;
    default:
        return state;
    }
}