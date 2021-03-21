
import { connect } from 'react-redux';
import CreateAccount from '../../../../../components/auth/CreateAccount';
import { client } from '../../../../../core/client';
import { triggerNotification } from '../../../../../components/common/Notification/actions';
import { registerUser, loginUser, getProfile, setUserProfile } from '../../../../../store/common/user/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../../store/common/validation/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    validationErrors: state.Validation.validationErrors
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    register: (username, password) => {
        const user = { username, password };
        const validation = validator.auth.register(user);
        if (validation.valid) {
            dispatch(registerUser(username, password))
                .then((response) => {
                    if (!response.action.payload.error) {
                        dispatch(loginUser(username, password)).then((response) => {
                            if(!response.action.payload.error){
                                dispatch(getProfile()).then((res) => {
                                    if(!res.action.payload.error){
                                        dispatch(setUserProfile(res.action.payload));
                                        ownProps.history.push('/');
                                    }
                                })
                            }
                        })
                    }
                    else {
                        dispatch(triggerNotification({msg: response.action.payload.message, type:'error', duration:2}));
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);