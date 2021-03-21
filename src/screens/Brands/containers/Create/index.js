import { connect } from 'react-redux';
import { createBrand } from './actions';
import CreateBrand from '../../../../components/entityActions/Brands/Create';
import { client } from '../../../../core/client';
import {closeDrawer} from '../../../../components/common/drawer/container/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { getBrands } from '../../../../store/common/brands/actions';
import {setBrandPhoto, updateBrandImage} from '../screen/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    brandData: {contact: {}},
    brandPhoto: state.BrandsPage.brandPhoto,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, brandPhoto) => (brand) => {
        const validation = validator.brand.create(brand);
        if(validation.valid){
            dispatch(createBrand(brand)).then((response) => {
                dispatch(closeDrawer());
                if(!response.action.payload.error) {
                    if(brandPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', brandPhoto);
                        dispatch(updateBrandImage(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'Brand was successfully created!', duration: 2, type: 'success'}));
                                dispatch(getBrands());
                            }
                        })
                    } 
                    else {
                        dispatch(getBrands());
                        dispatch(triggerNotification({msg: 'Brand was successfully created!', duration: 2, type: 'success'}));
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
    setBrandPhoto: (val) => {
        dispatch(setBrandPhoto(val));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.brandPhoto)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateBrand);
