import { connect } from 'react-redux';
import { verifyToken, setTokenValidity, setRedirect } from './actions';
import PasswordRecovery from '../..';
import { client } from '../../../../../core/client';
import { triggerNotification } from '../../../../../components/common/Notification/actions';
import { passwordRecovery } from '../../../../../store/common/user/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../../store/common/validation/actions';

const {validator} = client;

const mapStateToProps = (state) => ({
    validationErrors: state.Validation.validationErrors,
    validToken: state.PasswordRecovery.validToken,
    redirectToSignIn: state.PasswordRecovery.redirectToSignIn
});
const mapDispatchToProps = (dispatch) => ({
    verifyToken: (token) => {
        const validation = validator.auth.verify(token);
        if(validation.valid){
            dispatch(verifyToken(token)).then(response => {
                if(!response.action.payload.error){
                    dispatch(setTokenValidity(true));
                }
                else {
                    dispatch(setTokenValidity(false));
                }
            })
        }
        else {
            dispatch(setTokenValidity(false));
        }
    },
    passwordRecovery: (password, token) => {
        const validation = validator.auth.verifyPasswordRecovery(password, token);
        if(validation.valid) {
            dispatch(passwordRecovery(password,token)).then(response => {
                if(!response.action.payload.eror){
                    dispatch(setRedirect());
                    dispatch(triggerNotification({msg:'Your password was changed successfully.', type:'success', duration:2}));
                }
                else {
                    dispatch(triggerNotification({msg:'There was a problem completing the action.', type:'error', duration:2}));
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);