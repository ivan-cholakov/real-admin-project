import { connect } from 'react-redux';
import { deleteBrand } from './actions';
import { openDrawer } from '../../../../components/common/drawer/container/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import DeleteBrand from '../../../../components/forms/Brands/Delete';
import { getBrands } from '../../../../store/common/brands/actions';


const mapStateToProps = (state) => ({
    brandsData: state.BrandsPage.brandData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteBrand: (id) => {
        dispatch(deleteBrand(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(openDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'Brand was successfully deleted!', duration: 2, type: 'success'}));
                dispatch(getBrands());
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteBrand);