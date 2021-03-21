import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Stockist from '../index';
import { client } from '../../../../../core/client';
import { push } from 'connected-react-router';
import { triggerNotification } from '../../../../common/Notification/actions';

const mstp = (state) => {
    return {
        product: state.ProductsPage.productData,
        stockist: state.StockistsPage.stockistData,
        brand: state.BrandsPage.brandData,
    }
}


const mdtp = (dispatch) => ({
    productSave: () => async (productId, file) => {
        const data = new FormData();
        data.append('csv', file, 'file.csv');
        const res = await client.product.uploadCsv(productId, data);
        if(res.hasOwnProperty('uploaded') && res.uploaded == true){
            dispatch(triggerNotification({
                type: 'success',
                msg: 'Stockist CSV was successfuly uploaded!',
                duration: 6,
            }))
        }
        dispatch(push(`/assets/products/${productId}/ecom`))
    },
    brandSave: () => async (brandId, file) => {
        const data = new FormData();
        data.append('csv', file, 'file.csv');
        const res = await client.brand.uploadCsv(brandId, data);
        if(res.hasOwnProperty('uploaded') && res.uploaded == true){
            dispatch(triggerNotification({
                type: 'success',
                msg: 'Stockist CSV was successfuly uploaded!',
                duration: 6,
            }))
        }
        dispatch(push(`/assets/brands/${brandId}/ecom?type=brand`))
    }
});

const mp = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        brandSave: dispatchProps.brandSave(stateProps),
        productSave: dispatchProps.productSave(stateProps),
    }
}

export default connect(
    mstp,
    mdtp,
    mp
)(withRouter(Stockist));