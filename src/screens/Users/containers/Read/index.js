import { connect } from 'react-redux';
import ReadUser from '../../../../components/entityActions/Users/Read';
import {triggerNotification} from '../../../../components/common/Notification/actions';
import {updateUserPhoto, uploadCoverPhoto} from '../screen/actions';
// import { getProfile } from '../../../../store/common/user/actions';


const mapStateToProps = (state) => ({
    userData: state.UsersPage.userData,
    userProfile: state.User.userProfile
});

const mapDispatchToProps = (dispatch) => ({
    updateUserPhoto: ({userId, invite}) => (blob) => {
        let formData = new FormData();
        formData.append('profile', blob);
        dispatch(updateUserPhoto(formData, {userId, invite})).then((response) => {
            if(!response.action.payload.error) {
                // dispatch(getProfile())
                dispatch(triggerNotification({msg: 'User Photo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    },
    updateCoverPhoto: ({userId, invite}) => (blob) => {
        let formData = new FormData();
        formData.append('cover', blob);
        dispatch(uploadCoverPhoto(formData, {userId, invite})).then((response) => {
            if(!response.action.payload.error) {
                // dispatch(getProfile())
                dispatch(triggerNotification({msg: 'Cover Photo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        updateUserPhoto: dispatchProps.updateUserPhoto({userId: stateProps.userData.data.id}),
        updateCoverPhoto: dispatchProps.updateCoverPhoto({userId: stateProps.userData.data.id}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ReadUser);
