import { client } from '../../../../core/client';


export const deleteUser = (userId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_USER',
            payload: client.user.delete(userId)
        })
    }
};
