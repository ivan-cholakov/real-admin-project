import { client } from '../../core/client';

const { validator } = client;

export const createCategory = category => {
    return {
        type: 'CREATE_CATEGORY',
        payload: client.category.create(category)
    };
};

export const fetchCategories = () => ({
    type: 'FETCH_CATEGORIES',
    payload: client.category.list()
});

export const updateCategory = category => {
    return {
        type: 'UPDATE_CATEGORY',
        payload: client.category.update(category)
    };
};

export const deleteCategory = id => ({
    type: 'DELETE_CATEGORY',
    payload: client.category.delete(id)
});

export const uploadImage = formData => dispatch =>
    dispatch({
        type: 'UPLOAD_IMAGE',
        payload: client.category.uploadImage(formData)
    });
