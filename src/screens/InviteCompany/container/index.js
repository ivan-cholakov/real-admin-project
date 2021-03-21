import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import InviteCompany from '../';
import {inviteOwner, signOut, setUserProfile } from '../../../store/common/user/actions';
import { triggerNotification } from '../../../components/common/Notification/actions';
import { client } from '../../../core/client';
import { setValidationErrors, resetValidationErrors } from '../../../store/common/validation/actions';
import { updateUserPhoto } from '../../Users/containers/screen/actions';
import { changeActive, changeTitle } from '../../../components/ViewWrapper/containers/Header/actions';
import { getRoles } from '../../../store/common/users/actions';


const mstp = ({
    Validation,
    User: {
        userProfile,
    }
}) => ({
    validationErrors: Validation.validationErrors,
    permissions: userProfile.permissions.map(p => p.name),
    userProfile
})

const mapDispatchToProps = (dispatch) => ({
    changeTitle: (title) => {
        dispatch(changeTitle(title));
    },
    invite: async (
        {
            contact: { email },
            firstName,
            lastName,
            phone,
            position
        },
        profileImage
    ) => {
        const params = {
            username: email || '',
            firstName: firstName || '',
            lastName: lastName || '',
            position: position || '',
            contact: {
                email,
                phone
            }
        }
        const validation = client.validator.auth.inviteOwner(params);
        if (validation.valid) {
            const res = await dispatch(inviteOwner(params))
            if (res.action.payload.error) {
                dispatch(triggerNotification({
                    msg: 'Unable to invite a company, please try again later',
                    duration: 2,
                    type: 'error'
                }));

                // indicates that the operation is failed
                return false
            }
            if (profileImage) {
                const { userId } = res.action.payload;
                const photo = new FormData()
                photo.append('profile', profileImage)
                await dispatch(updateUserPhoto(photo, { userId }))
            }
            dispatch(triggerNotification({
                msg: 'Company Owner successfully invited!',
                duration: 10,
                type: 'success',
            }));
        }
        else {
            dispatch(setValidationErrors(validation.errors));
            return false;
        }
        // indicates that the operation is successful
        return true;
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    },
    changeNavActive: () => {
        dispatch(changeActive());
    },
    signOut: () => {
        dispatch(signOut()).then(() => {
            //TODO
            dispatch(setUserProfile({}));
            localStorage.setItem('session', '');
            dispatch(push('/sign-in'));

        })
    },
    getRoles: () => {
        dispatch(getRoles());
    }
});


export default connect(
    mstp,
    mapDispatchToProps
)(InviteCompany)