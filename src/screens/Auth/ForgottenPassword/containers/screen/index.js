import { connect } from 'react-redux';
import { client } from '../../../../../core/client';
import { triggerNotification } from '../../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../../store/common/validation/actions';
import { forgottenPassword } from '../../../../../store/common/user/actions';
import ForgottenPassword from '../..';

const { validator } = client;

const mapStateToProps = (state) => ({
    validationErrors: state.Validation.validationErrors
});
const mapDispatchToProps = (dispatch) => ({
    forgottenPassword: (account) => {
        const validation = validator.auth.passwordRecoveryViaEmail(account);
        if(validation.valid){
            dispatch(forgottenPassword(account)).then(response => {
                if(!response.action.payload.error){
                    dispatch(triggerNotification({msg:'Please check your mail for your password reset link.', type: 'success', duration: 3}));
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenPassword);