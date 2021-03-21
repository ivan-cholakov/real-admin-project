import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import { updateProductPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateProduct from '../../../../components/entityActions/Products/Update';
import { updateProduct } from './actions';
import { getProducts } from '../../../../store/common/products/actions';
import {openDrawer} from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    productData: state.ProductsPage.productData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
    brandsList: state.Brands.brandsData,
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, productId) => (product) => {
        const validation = validator.product.create(product);
        if(validation.valid){
            product.id = productId;
            dispatch(updateProduct(product)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(openDrawer({visible: false, action: '', title: ''}));
                    dispatch(getProducts());
                    dispatch(triggerNotification({msg: 'Product was successfully updated!', duration: 2, type: 'success'}));
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
    updateProductPhoto: (id) => (blob) => {
        let formData = new FormData();
        formData.set('image', blob);
        dispatch(updateProductPhoto(id, formData)).then((response) => {
            if(!response.action.payload.error) {
                dispatch(triggerNotification({msg: 'Product Logo was updated successfully!', duration: 2, type: 'success'}));
            }
        })
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.productData.id),
        updateProductPhoto: dispatchProps.updateProductPhoto(stateProps.productData.id)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UpdateProduct);
