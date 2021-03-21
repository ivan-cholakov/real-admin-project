import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import { openDrawer } from '../../../../components/common/drawer/container/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateBrand from '../../../../components/entityActions/Brands/Update/index';
import { updateBrand } from './actions';
import { getBrands } from '../../../../store/common/brands/actions';
import { updateBrandImage } from '../screen/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    brandData: state.BrandsPage.brandData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, brandId) => (brand) => {
        const validation = validator.brand.create(brand);
        if(validation.valid){
            brand.id = brandId;
            dispatch(updateBrand(brand)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(openDrawer({visible: false, action: '', title: ''}));
                    dispatch(getBrands());
                    dispatch(triggerNotification({msg: 'Brand was successfully updated!', duration: 2, type: 'success'}));
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
    updateBrandLogo: (id) => (blob) => {
        let formData = new FormData();
        formData.set('image', blob);
        dispatch(updateBrandImage(id, formData)).then((response) => {
            if(!response.action.payload.error) {
                dispatch(triggerNotification({msg: 'Brand Logo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.brandData.id),
        updateBrandLogo: dispatchProps.updateBrandLogo(stateProps.brandData.id)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateBrand);
