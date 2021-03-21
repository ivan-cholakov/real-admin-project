import { connect } from 'react-redux';
import { getProducts } from '../../../../store/common/products/actions';
import { getBrands } from '../../../../store/common/brands/actions';
import Batches from '../../index';
import { openDrawer } from '../../../../components/common/drawer/container/actions';
import { getTrails } from '../../../../store/common/trails/actions';
import { getStockists } from '../../../../store/common/stockists/actions';
import { getEcoms } from '../../../../store/common/ecoms/actions';
import { setCurrentProduct } from '../../../Products/containers/screen/actions';
import { createBatch, getBatchCount, deleteBatch } from './actions';
import { client } from '../../../../core/client';
import { Config } from '../../../../core/config';
import { getCampaigns } from '../../../../store/common/campaigns/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { push } from 'connected-react-router';

const config = new Config();

const mapStateToProps = state => ({
    productsData: state.Products.productsData,
    brandsList: state.Brands.brandsData,
    trailsData: state.Trails.trailsData.data,
    stockistsData: state.Stockists.stockistsData.data,
    ecomsData: state.Ecoms.ecomsData.data,
    userProfile: state.User.userProfile,
    selectedProduct: state.ProductsPage.productData,
    batchesCount: state.BatchesPage.batchesCount
});
const mapDispatchToProps = dispatch => ({
    getProducts: () => {
        return dispatch(getProducts());
    },
    getBrands: () => {
        return dispatch(getBrands());
    },
    getCampaigns: options => {
        return dispatch(getCampaigns(options));
    },
    getBatchCount: productId => {
        return dispatch(getBatchCount(productId));
    },
    openDrawer: drawerData => {
        return dispatch(openDrawer(drawerData));
    },
    getTrails: options => {
        return dispatch(getTrails(options));
    },
    getStockists: (options, productId) => {
        return dispatch(getStockists(options, productId));
    },
    getEcoms: (options, productId) => {
        return dispatch(getEcoms(options, productId));
    },
    getCurrentProduct: async id => {
        const baseUrl = config.getBaseUrl();
        const token = client.auth.getSessionToken();
        const productResponse = await client.product.get(id);
        const certificateResponse = await client.product.getCertificates(id);
        const res = await fetch(
            `${baseUrl}/storage${productResponse.mainImage}?token=${token}`
        );
        productResponse.mainImage = await res.blob();
        productResponse.certificates = certificateResponse.data.map(c => {
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

        return dispatch(setCurrentProduct(productResponse));
    },
    submitBatch: (batch, incentive) => {
        delete batch.id;
        dispatch(createBatch(batch, incentive)).then(res => {
            if (!res.action.payload.error) {
                dispatch(
                    triggerNotification({
                        type: 'success',
                        msg: 'Batch was successfully created.',
                        duration: 5
                    })
                );
                dispatch(push('/batches'));
            }
        });
    },
    createBatch: (batch, incentive) => {
        dispatch(createBatch(batch, incentive)).then(res => {
            if (!res.action.payload.error) {
                dispatch(
                    triggerNotification({
                        type: 'success',
                        msg: 'Batch was successfully created.',
                        duration: 5
                    })
                );
                dispatch(push('/batches'));
            }
        });
    },
    deleteBatch: id => {
        dispatch(deleteBatch(id)).then(res => {
            if (!res.action.payload.error) {
                dispatch(
                    triggerNotification({
                        type: 'success',
                        msg: 'Batch was successfully deleted.',
                        duration: 5
                    })
                );
                dispatch(push('/batches'));
            }
        });
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Batches);
