import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import {updateUserPhoto, uploadCoverPhoto} from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateUser from '../../../../components/entityActions/Users/Update';
import { updateUser } from './actions';
import { getUsers } from '../../../../store/common/users/actions';
import {closeDrawer} from '../../../../components/common/drawer/container/actions';
import {changePassword} from '../../../../store/common/user/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    userData: state.UsersPage.userData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    brandsList: state.Brands.brandsData,
    rolesData: state.Users.roles.data,
    showPassword: state.DrawerReducer.drawerInfo.showPassword
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, userId) => (user) => {
        const validation = validator.user.update(user);
        if(validation.valid){
            user.id = userId;
            dispatch(updateUser(user)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(closeDrawer());
                    dispatch(getUsers());
                    dispatch(triggerNotification({msg: 'User was successfully updated!', duration: 2, type: 'success'}));
                }
            })
        }
        else {
            dispatch(setValidationErrors(validation.errors));
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    },
    updateUserPhoto: ({userId, invite}) => (blob) => {
        let formData = new FormData();
        formData.append('profile', blob);
        dispatch(updateUserPhoto(formData, {userId, invite})).then((response) => {
            if(!response.action.payload.error) {
                dispatch(getUsers());
                dispatch(triggerNotification({msg: 'User Photo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    },
    updateCoverPhoto: ({userId, invite}) => (blob) => {
        let formData = new FormData();
        formData.append('cover', blob);
        dispatch(uploadCoverPhoto(formData, {userId, invite})).then((response) => {
            if(!response.action.payload.error) {
                dispatch(getUsers());
                dispatch(triggerNotification({msg: 'Cover Photo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    },
    changePassword: (password,newPassword) => {

        const validation = validator.auth.changePassword(password,newPassword);
        if(validation.valid){
            dispatch(changePassword(password,newPassword)).then((response) => {
                if(!response.action.payload.error){
                    dispatch(closeDrawer());
                    dispatch(triggerNotification({msg: 'Your password was successfully changed.', type:'success', duration:3}));
                }
            })
        }
        else {
            dispatch(setValidationErrors(validation.errors));
        }
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.userData.data.id),
        updateUserPhoto: dispatchProps.updateUserPhoto({userId: stateProps.userData.data.id}),
        updateCoverPhoto: dispatchProps.updateCoverPhoto({userId: stateProps.userData.data.id}),
        changePassword: dispatchProps.changePassword
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateUser);
