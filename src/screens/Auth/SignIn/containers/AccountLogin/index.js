import { connect } from 'react-redux';
import AccountLogin from '../../../../../components/auth/AccountLogin';
import { client } from '../../../../../core/client';
import { loginUser, getProfile, setUserProfile } from '../../../../../store/common/user/actions';
import { setValidationErrors, resetValidationErrors } from '../../../../../store/common/validation/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    validationErrors: state.Validation.validationErrors
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    login: async (username, password) => {

        const validation = validator.auth.login(username, password);
        if (validation.valid) {
            dispatch(loginUser(username, password)).then((response) => {
                if (!response.action.payload.error) {
                    dispatch(getProfile()).then((res) => {
                        if (!res.action.payload.error) {
                            dispatch(setUserProfile(res.action.payload));
                            ownProps.history.push('/');
                        }
                    })
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountLogin);