import { connect } from 'react-redux';
import Stockist from '../../';
import { client } from '../../../../../../core/client';
import { triggerNotification } from '../../../../../common/Notification/actions';
import { setStockist } from '../../containers/actions';

const mstp = (state) => {
    return {
        product: state.ProductsPage.productData,
        stockist: state.StockistsPage.stockistData,
    }
}

const mdtp = (dispatch, ownProps) => ({
    edit: (state) => (name, value) => {
        const stockist = {
            ...state.stockist,
            [name]: value,
        }
        dispatch(setStockist(stockist))
    },
    loadStockist: async (productId) => {
        const { data: [ stockist ] } = await client.stockist.list(productId);
        stockist && dispatch(setStockist(stockist))
    },
    save: (state) => async () => {
        if (!state.stockist.id) {
            const { id } = await client.stockist.create(state.stockist)
            const stockist = {
                ...state.stockist,
                id,
            }
            dispatch(setStockist(stockist));
            dispatch(triggerNotification({
                type: 'success',
                msg: 'Stockist was successfuly added!',
                duration: 10,
            }))
        } else {
            await client.stockist.update(state.stockist)
            dispatch(triggerNotification({
                type: 'success',
                msg: 'Stockist was successfuly updated!',
                duration: 10,
            }))
        }
        ownProps.handleVisibleChange(false)
    }
});

const mp = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        save: dispatchProps.save(stateProps),
        edit: dispatchProps.edit(stateProps),
    }
}

export default connect(
    mstp,
    mdtp,
    mp
)(Stockist)