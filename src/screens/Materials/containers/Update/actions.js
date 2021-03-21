import { client } from '../../../../core/client';


export const updateMaterial = (material) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_MATERIAL',
            payload: client.material.update(material)
        })
    }
};
