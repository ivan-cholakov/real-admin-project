import { connect } from 'react-redux';
import { deleteMaterial } from './actions';
import { triggerDrawer } from '../screen/actions';
import { triggerNotification } from '../../../../../../components/common/Notification/actions';
import DeleteMaterial from '../../../../Delete';


const mapStateToProps = (state) => ({
    materialsData: state.MaterialsPage.materialData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteMaterial: (id) => {
        dispatch(deleteMaterial(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(triggerDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'Material was successfully deleted!', duration: 2, type: 'success'}));
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteMaterial);
