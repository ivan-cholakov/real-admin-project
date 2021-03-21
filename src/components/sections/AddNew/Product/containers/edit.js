import { connect } from 'react-redux';
import EditProduct from '../EditProduct';
import {getBrands} from '../../../../../store/common/brands/actions';
import { getProduct } from '../../../../../screens/Products/containers/screen/actions';

const mapStateToProps = (state) => {
    return {
        product: state.ProductsPage.productData,
        user: state.UsersPage.userData.data,
        brands: state.Brands.brandsData,
        newBrand: state.NewBrandReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getBrands: () => {
        dispatch(getBrands())
    },
    getProduct(id) {
        dispatch(getProduct(id))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
