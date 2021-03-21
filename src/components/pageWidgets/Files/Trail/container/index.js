import { connect } from 'react-redux';
import Contents from '../index';
import { createTrail, setTrailData, getTrails, getTrail } from '../../../../../store/common/trails/actions';
import { client } from '../../../../../core/client';
import { triggerNotification } from '../../../../common/Notification/actions';


const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
const day = (now.getDate() + 1) < 10 ? `0${now.getDate() + 1}` : now.getDate() + 1;

const fileName = (productName) => {
    return `${productName.replace(/ /g,'-')}-${year}-${month}-${day}`;
} 

const mstp = (state) => {
    return {
        product: state.ProductsPage.productData,
        trails: state.Trails.trailsData.data,
    }
}

const mdtp = (dispatch) => {
    return {
        loadTrails: async (product) => {
            const queryOptions = new client.QueryOptions();
            queryOptions.filter = { type: 'string', input: product.id, field: 'productId' }
            dispatch(getTrails(queryOptions))
        },
        onAddTrail: (product) => async () => {
            const { action: { payload: { id, error } }} = await dispatch(createTrail({
                displayName: fileName(product.displayName),
                productId: product.id,
            }))
            if (error) {
                dispatch(triggerNotification({
                    type: 'error',
                    msg: 'There was an error creating a Trail',
                    duration: 10
                }))
                return false;
            }
            dispatch(setTrailData({
                id,
                displayName: fileName(product.displayName)
            }))
            const queryOptions = new client.QueryOptions();
            queryOptions.filter = { type: 'string', input: product.id, field: 'productId' }
            dispatch(getTrails(queryOptions))
            return true;
        },
        onSelectTrail: async (trailId) => {
            const { action: { payload }} = await dispatch(getTrail(trailId))
            if (payload.error) {
                dispatch(triggerNotification({
                    type: 'error',
                    msg: 'There was an error selecting a Trail',
                    duration: 10
                }))
                return false;
            }
            dispatch(setTrailData(payload))
            return true;
        }
    }
}

const mp = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onAddTrail: dispatchProps.onAddTrail(stateProps.product),
    }
}

export default connect(
    mstp,
    mdtp,
    mp
)(Contents);