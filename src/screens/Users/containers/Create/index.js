import { connect } from 'react-redux';
import { createUser } from './actions';
import CreateUser from '../../../../components/entityActions/Users/Create';
import { client } from '../../../../core/client';
import { setUserPhoto, updateUserPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { closeDrawer } from '../../../../components/common/drawer/container/actions';
import {getUsers} from '../../../../store/common/users/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    userData: {contact: {}},
    userPhoto: state.UsersPage.userPhoto,
    brandsList: state.Brands.brandsData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, userPhoto) => (user) => {
        const validation = validator.user.create(user);
        if(validation.valid){
            dispatch(createUser(user)).then((response) => {
                dispatch(closeDrawer());
                if(!response.action.payload.error) {
                    if(userPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', userPhoto);
                        dispatch(updateUserPhoto(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'User was successfully created!', duration: 2, type: 'success'}));
                                dispatch(getUsers());
                            }
                        })
                    } 
                    else {
                        dispatch(getUsers());
                        dispatch(triggerNotification({msg: 'User was successfully created!', duration: 2, type: 'success'}));
                    }
                }
            })
        }
        else {
            dispatch(setValidationErrors(validation.errors));
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    },
    setUserPhoto: (val) => {
        dispatch(setUserPhoto(val));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.userPhoto)
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateUser);
