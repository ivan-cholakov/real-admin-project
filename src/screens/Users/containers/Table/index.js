import { connect } from 'react-redux';
import TableUsers from '../../../../components/pageWidgets/TableUsers';
import {getRoles, getUsers} from '../../../../store/common/users/actions';
import {updateUser} from '../Update/actions';
import {triggerNotification} from '../../../../components/common/Notification/actions';
import {setValidationErrors} from '../../../../store/common/validation/actions';
import {client} from '../../../../core/client';
import { deleteUser } from '../Delete/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    loading: state.Users.loading && state.Users.rolesLoading,
    scroll: { x: 800},
    dataSource: state.Users.usersData,
    rolesData: state.Users.roles.data,
    userData: state.UsersPage.userData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
});

const mapDispatchToProps = (dispatch) => ({
    getRoles: () => {
        dispatch(getRoles())
    },
    deleteUser: (id) => {
        dispatch(deleteUser(id)).then((response) => {
            if(!response.action.payload.error){
                dispatch(getUsers());
                dispatch(triggerNotification({msg: 'User was succefully deleted!', duration: 2, type: 'success'}));
            }
        })
    },
    onFormSubmit: (user) => {
        const validation = validator.user.update(user);
        if(validation.valid){
            dispatch(updateUser(user)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(getUsers());
                    dispatch(triggerNotification({msg: 'User was successfully updated!', duration: 2, type: 'success'}));
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
        onFormSubmit: dispatchProps.onFormSubmit
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TableUsers);
