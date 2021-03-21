import { client } from '../core/client';

export const setToken = (token) => {
    return (dispatch) => {
        return dispatch({
            type: 'SET_TOKEN',
            payload: client.auth.setSessionToken(token)
        })
    }
}