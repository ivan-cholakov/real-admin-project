import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Filters from '../../../../components/sections/Dashboard/Filters';
import { getBrands } from '../../../../store/common/brands/actions'
import { getProducts } from '../../../../store/common/products/actions'
import { setFiltersField } from '../screen/actions';


const mstp = (state) => {
    const {
        Brands: { brandsData: brands },
        Products: { productsData: products },
    } = state;
    const allProductsOprion = {
        label: { text: 'All Products'},
        value: 'all'
    }
    const productsDropdown = brands.map(brand => ({
        label: brand.displayName,
        value: brand.id,
        children: products
            .filter(p => p.brandId === brand.id)
            .map(product => ({
                label: product.displayName,
                value: product.id
            }))
    }));
    productsDropdown.unshift(allProductsOprion)
    return {
        products: productsDropdown,
        productId: state.Dashboard.filters.productId,
        startDate: state.Dashboard.filters.from,
        endDate: state.Dashboard.filters.to,
    }
}

const mdtp = (dispatch) => ({
    loadData: () => {
        dispatch(getBrands())
        dispatch(getProducts())
    },
    onProductChange: (value) => {
        dispatch(setFiltersField('productId', value));
    },
    onNewBatchClick: () => {
        dispatch(push('/batch'));
    },
    onStartDateChange: (value) => {
        dispatch(setFiltersField('from', value));
    },
    onEndDateChange: (value) => {
        dispatch(setFiltersField('to', value));
    }
})

export default connect(
    mstp,
    mdtp,
)(Filters);