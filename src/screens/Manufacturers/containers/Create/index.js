import { connect } from 'react-redux';
import { createManufacturer } from './actions';
import CreateManufacturer from '../../../../components/entityActions/Manufacturers/Create';
import { client } from '../../../../core/client';
import { setManufacturerPhoto, updateManufacturerPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { closeDrawer, openDrawer } from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    manufacturerData: {contact: {}},
    manufacturerPhoto: state.ManufacturersPage.manufacturerPhoto,
    brandsList: state.Brands.brandsData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, manufacturerPhoto) => (manufacturer) => {
        const validation = validator.manufacturer.create(manufacturer);
        if(validation.valid){
            dispatch(createManufacturer(manufacturer)).then((response) => {
                dispatch(openDrawer({visible: false, action: '', title: ''}));
                if(!response.action.payload.error) {
                    if(manufacturerPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', manufacturerPhoto);
                        dispatch(updateManufacturerPhoto(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'Manufacturer was successfully created!', duration: 2, type: 'success'}));
                            }
                        })
                    } 
                    else {
                        dispatch(triggerNotification({msg: 'Manufacturer was successfully created!', duration: 2, type: 'success'}));
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
    setManufacturerPhoto: (val) => {
        dispatch(setManufacturerPhoto(val));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.manufacturerPhoto)
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateManufacturer);
