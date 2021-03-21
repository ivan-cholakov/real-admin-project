import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import { updateTrailPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateTrail from '../../../../components/entityActions/Trails/Update';
import { updateTrail } from './actions';
import { getTrails } from '../../../../store/common/trails/actions';
import {openDrawer} from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    trailData: state.TrailsPage.trailData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    productsList: state.Products.productsData,
    materialsData: state.Materials.materialsData,
    manufacturersData: state.Manufacturers.manufacturersData
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, trailId) => (trail) => {
        const validation = validator.trail.create(trail);
        if(validation.valid){
            trail.ownerId = user.id;
            trail.id = trailId;
            dispatch(updateTrail(trail)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(openDrawer({visible: false, action: '', title: ''}));
                    dispatch(getTrails());
                    dispatch(triggerNotification({msg: 'Trail was successfully updated!', duration: 2, type: 'success'}));
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
    updateTrailPhoto: (id) => (blob) => {
        let formData = new FormData();
        formData.set('image', blob);
        dispatch(updateTrailPhoto(id, formData)).then((response) => {
            if(!response.action.payload.error) {
                dispatch(triggerNotification({msg: 'Trail Logo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.trailData.id),
        updateTrailPhoto: dispatchProps.updateTrailPhoto(stateProps.trailData.id)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateTrail);
