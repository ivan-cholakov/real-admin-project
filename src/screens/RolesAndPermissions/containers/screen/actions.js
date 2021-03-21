import { client } from '../../../../core/client';



export const getPermissions = () => {
    return (dispatch) => {
        return dispatch({
            type: 'GET_ALL_PERMISSIONS',
            payload: client.permissions.getAll()
        })
    }
};

//get role permissions by role id from mongo.
