import { connect } from 'react-redux';
import { createProduct } from './actions';
import CreateProduct from '../../../../components/entityActions/Products/Create';
import { client } from '../../../../core/client';
import { setProductPhoto, updateProductPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { closeDrawer } from '../../../../components/common/drawer/container/actions';
import {getProducts} from '../../../../store/common/products/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    productData: {contact: {}},
    productPhoto: state.ProductsPage.productPhoto,
    brandsList: state.Brands.brandsData,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, productPhoto) => (product) => {
        const validation = validator.product.create(product);
        if(validation.valid){
            dispatch(createProduct(product)).then((response) => {
                dispatch(closeDrawer());
                if(!response.action.payload.error) {
                    if(productPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', productPhoto);
                        dispatch(updateProductPhoto(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'Product was successfully created!', duration: 2, type: 'success'}));
                                dispatch(getProducts());
                            }
                        })
                    } 
                    else {
                        dispatch(getProducts());
                        dispatch(triggerNotification({msg: 'Product was successfully created!', duration: 2, type: 'success'}));
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
    setProductPhoto: (val) => {
        dispatch(setProductPhoto(val));
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.productPhoto)
    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateProduct);
