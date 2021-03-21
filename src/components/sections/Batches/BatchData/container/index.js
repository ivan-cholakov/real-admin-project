import { connect } from 'react-redux';
import BatchData from '../';
import {openDrawer} from '../../../../../components/common/drawer/container/actions';


const mapStateToProps = (state) => ({
    productsData: state.Products.productsData,
    brandsData: state.Brands.brandsData,
    sessionId: state.User.userProfile.session.id,
    selectedProduct: state.ProductsPage.productData
});

const mapDispatchToProps = (dispatch) => ({
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BatchData);

