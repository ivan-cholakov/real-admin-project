import { client } from '../../../../../../core/client';


export const deleteTrail = (trailId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_COMPANY',
            payload: client.trail.delete(trailId)
        })
    }
};
