import { connect } from 'react-redux';
import { deleteCompany } from './actions';
import { triggerDrawer } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import DeleteCompany from '../../../../components/forms/Trails/Delete';
import { getTrails } from '../../../../store/common/trail/actions';


const mapStateToProps = (state) => ({
    trailData: state.TrailsPage.trailData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteCompany: (id) => {
        dispatch(deleteCompany(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(triggerDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'Company was successfully deleted!', duration: 2, type: 'success'}));
                dispatch(getTrails());
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCompany);
