import { connect } from 'react-redux';
import { deleteEcom } from './actions';
import { triggerDrawer } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import DeleteEcom from '../../../../components/forms/Ecoms/Delete';
import { getEcoms } from '../../../../store/common/ecoms/actions';


const mapStateToProps = (state) => ({
    ecomData: state.EcomsPage.ecomData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteEcom: (id) => {
        dispatch(deleteEcom(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(triggerDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'Ecom was successfully deleted!', duration: 2, type: 'success'}));
                dispatch(getEcoms());
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteEcom);
