import { connect } from 'react-redux';
import CreateAccount from '../../index';
import { push } from 'connected-react-router';
import { setProfilePicture, getProfile, inviteAccept, setUserProfile, getUserByInviteToken } from '../../../../../store/common/user/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../../store/common/validation/actions';
import { client } from '../../../../../core/client';
import { triggerNotification } from '../../../../../components/common/Notification/actions';
const { validator } = client;


export const Invite = (state = {}, action) => {
    switch (action.type) {
    case 'SET_USER_PROFILE':
        return Object.assign({}, state, {
            user: action.payload
        });

    default:
        return state
    }
}

const mapStateToProps = (state) => ({
    validationErrors: state.Validation.validationErrors,
    user: state.Invite.user,
});
const mapDispatchToProps = (dispatch) => ({
    loadUserInfo: async (userId, token) => {
        window.localStorage.setItem('session', '');
        client.auth.setSessionToken('')
        const data = await dispatch(getUserByInviteToken(userId, token))
        if (data.action.payload.error) {
            dispatch(triggerNotification({
                type: 'error',
                msg: 'There was a problem laoding invitation',
                duration: 5
            }))
            return dispatch(push('/'))
        }
        return dispatch(setUserProfile(data.action.payload))

    },
    register: async (params, profileImage) => {
        const validation = validator.auth.inviteAccept(params);
        if (validation.valid) {
            await dispatch(inviteAccept(params));
            const res = await dispatch(getProfile());
            const { action: { payload } } = res;
            dispatch(setUserProfile(payload));
            window.localStorage.setItem('session', client.auth.getSessionToken());
            if (!res.action.payload.error) {
                if (profileImage) {
                    const image = await dispatch(setProfilePicture(profileImage));
                    payload.profileImage = image.action.payload.identifier;
                }
                dispatch(setUserProfile(payload));
                dispatch(push('/onboarding/company'));
            }
        }
        else {
            dispatch(setValidationErrors(validation.errors));
            return false;
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);
