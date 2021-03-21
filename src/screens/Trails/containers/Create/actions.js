import { client } from '../../../../core/client';


export const createTrail = (trail) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_COMPANY',
            payload: client.trail.create(trail)
        })
    }
};
