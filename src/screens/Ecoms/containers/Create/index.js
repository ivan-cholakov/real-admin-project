import { connect } from 'react-redux';
import { createEcom } from './actions';
import CreateEcom from '../../../../components/entityActions/Ecoms/Create';
import { client } from '../../../../core/client';
import { setEcomPhoto, updateEcomPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { closeDrawer, openDrawer } from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    ecomData: {contact: {}},
    ecomPhoto: state.EcomsPage.ecomPhoto,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    productsList: state.Products.productsData
});
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, ecomPhoto) => (ecom) => {
        const validation = validator.ecom.create(ecom);
        if(validation.valid){
            ecom.ownerId = user.id;
            dispatch(createEcom(ecom)).then((response) => {
                dispatch(closeDrawer());
                if(!response.action.payload.error) {
                    if(ecomPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', ecomPhoto);
                        dispatch(updateEcomPhoto(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'Ecom was successfully created!', duration: 2, type: 'success'}));
                                /* Commented due to component rerender
                                TODO this needs to be fixed
                                 */
                                //    dispatch(getEcoms());
                            }
                        })
                    }
                    else {
                        /* Commented due to component rerender
                                TODO this needs to be fixed
                                 */
                        //   dispatch(getEcoms());
                        dispatch(triggerNotification({msg: 'Ecom was successfully created!', duration: 2, type: 'success'}));
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
    setEcomPhoto: (val) => {
        dispatch(setEcomPhoto(val));
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
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.ecomPhoto)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateEcom);
