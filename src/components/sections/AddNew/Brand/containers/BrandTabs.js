import { connect } from 'react-redux';
import BrandTabs from '../BrandTabs';
import { getBrands } from '../../../../../store/common/brands/actions';
import { getBrand } from '../../../../../screens/Brands/containers/screen/actions';

const mapStateToProps = (state) => {
    return {
        product: state.BrandsPage.productData,
        user: state.UsersPage.userData.data,
        brands: state.Brands.brandsData,
        newBrand: state.NewBrandReducer,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getBrands: () => {
        dispatch(getBrands())
    },
    getBrand(id) {
        dispatch(getBrand(id))
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(BrandTabs);
