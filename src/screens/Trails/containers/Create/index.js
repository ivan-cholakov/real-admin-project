import { connect } from 'react-redux';
import { createTrail } from './actions';
import CreateTrail from '../../../../components/entityActions/Trails/Create';
import { client } from '../../../../core/client';
import { setTrailPhoto, updateTrailPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { closeDrawer, openDrawer } from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    trailData: {contact: {}},
    trailPhoto: state.TrailsPage.trailPhoto,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    productsList: state.Products.productsData,
    materialsData: state.Materials.materialsData,
    manufacturersData: state.Manufacturers.manufacturersData
});
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, trailPhoto) => (trail) => {
        const validation = validator.trail.create(trail);
        if(validation.valid){
            trail.ownerId = user.id;
            dispatch(createTrail(trail)).then((response) => {
                dispatch(closeDrawer());
                if(!response.action.payload.error) {
                    if(trailPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', trailPhoto);
                        dispatch(updateTrailPhoto(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'Trail was successfully created!', duration: 2, type: 'success'}));
                                /* Commented due to component rerender
                                TODO this needs to be fixed
                                 */
                                //    dispatch(getTrails());
                            }
                        })
                    }
                    else {
                        /* Commented due to component rerender
                                TODO this needs to be fixed
                                 */
                        //   dispatch(getTrails());
                        dispatch(triggerNotification({msg: 'Trail was successfully created!', duration: 2, type: 'success'}));
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
    setTrailPhoto: (val) => {
        dispatch(setTrailPhoto(val));
    },
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    },
    closeDrawer: () => {
        dispatch(closeDrawer())
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.trailPhoto)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateTrail);
