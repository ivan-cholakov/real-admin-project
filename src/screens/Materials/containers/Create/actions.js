import { client } from '../../../../core/client';


export const createMaterial = (material) => {
    return (dispatch) => {
        return dispatch({
            type: 'CREATE_MATERIAL',
            payload: client.material.create(material)
        })
    }
};
