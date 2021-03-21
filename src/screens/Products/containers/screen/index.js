import { connect } from 'react-redux';
import ProductsList from '../..';
import { triggerDrawer } from '../../CRUD/containers/screen/actions';
import { getProducts } from '../../../../store/common/products/actions';
import { getBrands } from '../../../../store/common/brands/actions';


const mapStateToProps = (state) => ({
    productsData: state.Products.productsData,
    brandsList: state.Brands.brandsData
});
const mapDispatchToProps = (dispatch) => ({
    getProducts: () => {
        dispatch(getProducts())
    },
    getBrands: () => {
        dispatch(getBrands())
    },
    triggerDrawer: (drawerData) => {
        dispatch(triggerDrawer(drawerData))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);