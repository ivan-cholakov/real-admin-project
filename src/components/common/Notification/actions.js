export const triggerNotification = (notification) => {
    return (dispatch) => {
        return dispatch({
            type: 'TRIGGER_NOTIFICATION',
            payload: notification
        })
    }
}
export const triggerGenericError = (response) => {
    return (dispatch) => {
        return dispatch({
            type: 'TRIGGER_NOTIFICATION',
            payload: {type: 'error', msg: response.message, duration:3}
        })
    }
}
export const clearNotification = () => {
    return (dispatch) => {
        return dispatch({
            type: 'CLEAR_NOTIFICATION'
        })
    }
}