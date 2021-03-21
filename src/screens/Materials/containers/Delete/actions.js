import { client } from '../../../../../../core/client';


export const deleteMaterial = (materialId) => {
    return (dispatch) => {
        return dispatch({
            type: 'DELETE_MATERIAL',
            payload: client.material.delete(materialId)
        })
    }
};
