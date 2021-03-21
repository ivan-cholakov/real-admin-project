import { connect } from 'react-redux';
import ChangePassword from '../..';
import { client } from '../../../../../core/client';
import { triggerNotification } from '../../../../../components/common/Notification/actions';
import { changePassword } from '../../../../../store/common/user/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../../store/common/validation/actions';

const {validator} = client;

const mapStateToProps = (state) => ({
    validationErrors: state.Validation.validationErrors
});
const mapDispatchToProps = (dispatch) => ({
    changePassword: (password,newPassword) => {
        const validation = validator.auth.changePassword(password,newPassword);
        if(validation.valid){
            dispatch(changePassword(password,newPassword)).then((response) => {
                if(!response.action.payload.error){
                    dispatch(triggerNotification({msg: 'Your password was successfully changed.', type:'success', duration:3}));
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);