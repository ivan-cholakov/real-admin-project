import { client } from '../../../../core/client';


export const updateTrail = (trail) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_COMPANY',
            payload: client.trail.update(trail)
        })
    }
};
