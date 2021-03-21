import { connect } from 'react-redux';
import { deleteManufacturer } from './actions';
import { triggerDrawer } from '../screen/actions';
import { triggerNotification } from '../../../../../../components/common/Notification/actions';
import DeleteManufacturer from '../../../../Delete';


const mapStateToProps = (state) => ({
    manufacturersData: state.ManufacturersPage.manufacturerData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteManufacturer: (id) => {
        dispatch(deleteManufacturer(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(triggerDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'Manufacturer was successfully deleted!', duration: 2, type: 'success'}));
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteManufacturer);
