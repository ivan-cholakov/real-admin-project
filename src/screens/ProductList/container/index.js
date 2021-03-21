import { connect } from 'react-redux';
import ProductList from '../index';
import { getProducts } from '../../../store/common/products/actions';
import { triggerNotification } from '../../../components/common/Notification/actions';
import { setValidationErrors } from '../../../store/common/validation/actions';
import { updateProduct } from '../../../screens/Products/containers/Create/actions';
import { client } from '../../../core/client';

const mstp = (state) => {
    return {
        products: state.Products.productsData
    }
}

const mdtp = (dispatch) => ({
    getProducts: async () => {
        dispatch(getProducts())
    },

    onSubmit: async (products) => {
        const promises = products.map(async (product) => {
            const validation = client.validator.product.update(product);
            if (validation.valid) {
                return await dispatch(updateProduct(product))
            } else {
                dispatch(setValidationErrors(validation.errors));
            }
        })
        await Promise.all(promises);
        dispatch(triggerNotification({
            msg: 'Products were successfully updated!',
            duration: 3,
            type: 'success'
        }));
    },
})

export default connect(
    mstp,
    mdtp,
)(ProductList)
