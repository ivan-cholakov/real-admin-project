import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import { updateManufacturerPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateManufacturer from '../../../../components/entityActions/Manufacturers/Update';
import { updateManufacturer } from './actions';
import {openDrawer} from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    manufacturerData: state.ManufacturersPage.manufacturerData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    brandsList: state.Brands.brandsData,
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, manufacturerId) => (manufacturer) => {
        const validation = validator.manufacturer.create(manufacturer);
        if(validation.valid){
            manufacturer.id = manufacturerId;
            dispatch(updateManufacturer(manufacturer)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(openDrawer({visible: false, action: '', title: ''}));
                    dispatch(triggerNotification({msg: 'Manufacturer was successfully updated!', duration: 2, type: 'success'}));
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
    updateManufacturerPhoto: (id) => (blob) => {
        let formData = new FormData();
        formData.set('image', blob);
        dispatch(updateManufacturerPhoto(id, formData)).then((response) => {
            if(!response.action.payload.error) {
                dispatch(triggerNotification({msg: 'Manufacturer Logo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.manufacturerData.id),
        updateManufacturerPhoto: dispatchProps.updateManufacturerPhoto(stateProps.manufacturerData.id)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateManufacturer);
