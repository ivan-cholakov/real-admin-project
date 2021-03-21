import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import { updateMaterialPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateMaterial from '../../../../components/entityActions/Materials/Update';
import { updateMaterial } from './actions';
import {openDrawer} from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    materialData: state.MaterialsPage.materialData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    brandsList: state.Brands.brandsData,
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, materialId) => (material) => {
        const validation = validator.material.create(material);
        if(validation.valid){
            material.id = materialId;
            dispatch(updateMaterial(material)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(openDrawer({visible: false, action: '', title: ''}));
                    dispatch(triggerNotification({msg: 'Material was successfully updated!', duration: 2, type: 'success'}));
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
    updateMaterialPhoto: (id) => (blob) => {
        let formData = new FormData();
        formData.set('image', blob);
        dispatch(updateMaterialPhoto(id, formData)).then((response) => {
            if(!response.action.payload.error) {
                dispatch(triggerNotification({msg: 'Material Logo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.materialData.id),
        updateMaterialPhoto: dispatchProps.updateMaterialPhoto(stateProps.materialData.id)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateMaterial);
