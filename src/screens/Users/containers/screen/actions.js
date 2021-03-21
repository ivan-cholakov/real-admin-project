import { client } from '../../../../core/client';

export const triggerDrawer = (drawerData) => {
    return (dispatch) => {
        return dispatch({
            type: 'TRIGGER_DRAWER',
            payload: drawerData
        })
    }
};

export const getUser = (id) => {
    return(dispatch) => {
        return dispatch({
            type:'GET_USER_BY_ID',
            payload: client.user.get(id)
        })
    }
};

export const setUserPhoto = (val) => {
    return(dispatch) => {
        return dispatch({
            type:'SET_USER_PHOTO',
            payload: val
        })
    }
};

export const updateUserPhoto = (formData, {userId, invite}) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_USER_PHOTO',
            payload: client.user.uploadProfileImage(formData, {userId, invite})
        })
    }
};

export const uploadCoverPhoto = (formData, {userId, invite}) => {
    return (dispatch) => {
        return dispatch({
            type: 'UPDATE_COVER_PHOTO',
            payload: client.user.uploadCoverPhoto(formData, {userId, invite})
        })
    }
};


