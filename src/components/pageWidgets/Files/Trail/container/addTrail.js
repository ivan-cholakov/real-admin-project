import AddTrail from '../AddTrail'
import { connect } from 'react-redux';
import { updateTrail } from '../../../../../store/common/trails/actions';

const mstp = (state, ownProps) => {
    return {
        ...ownProps,
        product: state.ProductsPage.productData,
        trail: state.TrailsPage.trailData
    }
}

const mdtp = (dispatch) => {
    return {
        updateTrail: ({product, trail}) => async (data) => {
            const params = {
                id: trail.id,
                displayName: data.fileName,
                productId: product.id,
                contents: data.formData.contents,
                packaging: data.formData.packaging,
                manufacturers: data.formData.manufacturer
            }
            await dispatch(updateTrail(params))
            return true;
        }
    }
}

const mp = (stateProps, dispatchProps) => {
    const { product, trail } = stateProps;
    return {
        ...stateProps,
        ...dispatchProps,
        updateTrail: dispatchProps.updateTrail({ product, trail })
    }
}

export default connect(
    mstp,
    mdtp,
    mp
)(AddTrail)
