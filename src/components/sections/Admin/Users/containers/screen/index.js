import {connect} from 'react-redux';
import {getRoles, getUsers} from '../../../../../../store/common/users/actions';
import UsersScreen from '../../index';
import { client } from '../../../../../../core/client';
import { resetValidationErrors, setValidationErrors } from '../../../../../../store/common/validation/actions';
import { inviteUser } from '../../../../../../store/common/user/actions';
import { triggerNotification } from '../../../../../common/Notification/actions';

const mapStateToProps = (state) => {
    const roles = state.Users.roles.data || [];
    const rolesDropdown = roles.map(r => ({
        label: r.displayName,
        value: r.id
    }))
    return {
        usersData: state.Users.usersData,
        rolesDropdown,
    }
};

const mapDispatchToProps = (dispatch) => ({
    loadData: () => {
        dispatch(getUsers())
        dispatch(getRoles())
    },
    onSubmit: async (params) => {
        params.username = params.email;
        params.contact = {};
        params.contact.email = params.email;
        delete params.email
        const validation = client.validator.auth.inviteUser(params)
        if (validation.valid) {
            const res = await dispatch(inviteUser(params))
            await dispatch(getUsers());
            if (res.action.payload.error) {
                return dispatch(triggerNotification({
                    msg: 'Unable to invite a user, please try again later',
                    duration: 5,
                    type: 'error'
                }));
            } else {
                dispatch(triggerNotification({
                    msg: 'User successfully invited!',
                    duration: 10,
                    type: 'success'
                }));
            }
        } else {
            dispatch(setValidationErrors(validation.errors));
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
