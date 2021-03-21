import { triggerNotification } from '../../../components/common/Notification/actions';

export const setValidationErrors = (validationErrors) => {
    return (dispatch) => {
        //eslint-disable-next-line
        for (let [key, msg] of Object.entries(validationErrors)) {
            setTimeout(() => dispatch(triggerNotification({
                type: 'error',
                msg: msg,
                duration: 3
            })), 0);
        }
        return dispatch({
            type: 'SET_VALIDATION_ERRORS',
            payload: validationErrors
        });
    }
};
export const resetValidationErrors = () => {
    return (dispatch) => {
        return dispatch({
            type: 'RESET_VALIDATION_ERRORS'
        });
    }
};