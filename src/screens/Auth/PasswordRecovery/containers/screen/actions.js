import { client } from '../../../../../core/client';
export const verifyToken = (token) => {
    return (dispatch) => {
        return dispatch({
            type: 'VERIFY_TOKEN',
            payload: client.auth.checkPasswordRecoveryToken(token)
        })
    }
};
export const setRedirect = () => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_REDIRECT',
            payload: true
        })
    }
}
export const setTokenValidity = (val) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_TOKEN_VALIDITY',
            payload: val
        })
    }
}