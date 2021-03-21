import { connect } from 'react-redux';
import NewProduct from '../index';
import {getBrands} from '../../../../../store/common/brands/actions';

const mapStateToProps = (state) => ({
    user: state.UsersPage.userData.data,
    brands: state.Brands.brandsData,
    newBrand: state.NewBrandReducer
});

const mapDispatchToProps = (dispatch) => ({
    getBrands: () => {
        dispatch(getBrands())
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(NewProduct);
