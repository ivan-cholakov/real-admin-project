import { client } from '../../../../core/client';


export const createUser = (user) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_USER',
            payload: client.user.create(user)
        })
    }
};
