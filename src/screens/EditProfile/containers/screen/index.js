import { connect } from 'react-redux';
import EditProfile from '../..';
import { client } from '../../../../core/client';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { setProfilePicture, updateProfileInfo, getProfile, setUserProfile } from '../../../../store/common/user/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';

const { validator } = client;

const getAndSetProfile = (dispatch) => {
    dispatch(getProfile()).then((response) => {
        if(!response.action.payload.error) {
            dispatch(setUserProfile(response.action.payload));
        }
    })
}

const mapStateToProps = (state) => ({
    userProfile: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
});
const mapDispatchToProps = (dispatch) => ({
    setProfilePicture: (imageBlob) => {
        dispatch(setProfilePicture(imageBlob)).then((response) => {
            if (!response.action.payload.error) {
                getAndSetProfile(dispatch);
                dispatch(triggerNotification({msg:'Your profile picture has been updated successfully', type: 'success', duration: 2}))
            }
        })
    },
    updateProfileInfo: (fname, lname, phoneNumber, age, email) => {
        const profile = {
            firstName: fname,
            lastName: lname,
            age: +age,
            contact: {
                phone: phoneNumber,
                email: email
            }
        }
        const validation = validator.user.updateProfile(profile);
        if (validation.valid) {
            dispatch(updateProfileInfo(profile)).then((response) => {
                if (!response.action.payload.error) {
                    getAndSetProfile(dispatch);
                    dispatch(triggerNotification({msg:'Your profile info has been updated.', type: 'success', duration: 2}))
                }
            })
        }
        else {
            dispatch(setValidationErrors(validation.errors));
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);