import { client } from '../../../../core/client';


export const updateUser = (user) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_USER',
            payload: client.user.update(user)
        })
    }
};
