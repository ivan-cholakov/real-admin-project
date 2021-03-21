import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import { updateEcomPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateEcom from '../../../../components/entityActions/Ecoms/Update';
import { updateEcom } from './actions';
import { getEcoms } from '../../../../store/common/ecoms/actions';
import {openDrawer} from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    ecomData: state.EcomsPage.ecomData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    productsList: state.Products.productsData
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, ecomId) => (ecom) => {
        const validation = validator.ecom.create(ecom);
        if(validation.valid){
            ecom.ownerId = user.id;
            ecom.id = ecomId;
            dispatch(updateEcom(ecom)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(openDrawer({visible: false, action: '', title: ''}));
                    dispatch(getEcoms());
                    dispatch(triggerNotification({msg: 'Ecom was successfully updated!', duration: 2, type: 'success'}));
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
    updateEcomPhoto: (id) => (blob) => {
        let formData = new FormData();
        formData.set('image', blob);
        dispatch(updateEcomPhoto(id, formData)).then((response) => {
            if(!response.action.payload.error) {
                dispatch(triggerNotification({msg: 'Ecom Logo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.ecomData.id),
        updateEcomPhoto: dispatchProps.updateEcomPhoto(stateProps.ecomData.id)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateEcom);
