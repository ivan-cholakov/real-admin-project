import { connect } from 'react-redux';
import { deleteProduct } from './actions';
import { triggerDrawer } from '../screen/actions';
import { triggerNotification } from '../../../../../../components/common/Notification/actions';
import DeleteProduct from '../../../../Delete';
import { getProducts } from '../../../../../../store/common/products/actions';


const mapStateToProps = (state) => ({
    productsData: state.ProductsPage.productData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteProduct: (id) => {
        dispatch(deleteProduct(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(triggerDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'Product was successfully deleted!', duration: 2, type: 'success'}));
                dispatch(getProducts());
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProduct);