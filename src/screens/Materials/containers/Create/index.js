import { connect } from 'react-redux';
import { createMaterial } from './actions';
import CreateMaterial from '../../../../components/entityActions/Materials/Create';
import { client } from '../../../../core/client';
import { setMaterialPhoto, updateMaterialPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { closeDrawer, openDrawer } from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    materialData: {contact: {}},
    materialPhoto: state.MaterialsPage.materialPhoto,
    brandsList: state.Brands.brandsData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, materialPhoto) => (material) => {
        const validation = validator.material.create(material);
        if(validation.valid){
            dispatch(createMaterial(material)).then((response) => {
                dispatch(openDrawer({visible: false, action: '', title: ''}));
                if(!response.action.payload.error) {
                    if(materialPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', materialPhoto);
                        dispatch(updateMaterialPhoto(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'Material was successfully created!', duration: 2, type: 'success'}));
                            }
                        })
                    } 
                    else {
                        dispatch(triggerNotification({msg: 'Material was successfully created!', duration: 2, type: 'success'}));
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
    setMaterialPhoto: (val) => {
        dispatch(setMaterialPhoto(val));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.materialPhoto)
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateMaterial);
