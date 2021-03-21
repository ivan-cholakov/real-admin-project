import { connect } from 'react-redux';
import Dashboard from '../..';
import { getScans, getSegmentation, listDashboardBatches } from './actions';
import {getProducts} from '../../../../store/common/products/actions';

const mapStateToProps = (state) => ({
    scans: state.Dashboard.scans,
    filters: state.Dashboard.filters,
    segmentation: state.Dashboard.segmentation,
    batches: state.Dashboard.batches.data,
    products: state.Products.productsData
});

const mapDispatchToProps = (dispatch) => ({
    getScans: (productId, options) => {
        dispatch(getScans(productId, options));
    },
    getSegmentation: (productId, options) => {
        dispatch(getSegmentation(productId, options));
    },
    getBatches: (productId, options) => {
        return dispatch(listDashboardBatches(productId, options))
    },
    getProducts: (productId, options) => {
        return dispatch(getProducts(productId, options))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
