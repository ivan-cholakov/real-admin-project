import { connect } from 'react-redux';
import { deleteUser } from './actions';
import { triggerDrawer } from '../screen/actions';
import { triggerNotification } from '../../../../../../components/common/Notification/actions';
import DeleteUser from '../../../../Delete';
import { getUsers } from '../../../../../../store/common/users/actions';


const mapStateToProps = (state) => ({
    usersData: state.UsersPage.userData,
    userProfile: state.User.userProfile
}); 

const mapDispatchToProps = (dispatch) => ({
    deleteUser: (id) => {
        dispatch(deleteUser(id)).then((res) => {
            if(!res.action.payload.error) {
                dispatch(triggerDrawer({visible: false, action: '', title: ''}));
                dispatch(triggerNotification({msg: 'User was successfully deleted!', duration: 2, type: 'success'}));
                dispatch(getUsers());
            }
        })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
