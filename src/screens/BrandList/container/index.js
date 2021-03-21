import { connect } from 'react-redux';
import BrandList from '../index';
import { getBrands } from '../../../store/common/brands/actions';
import { triggerNotification } from '../../../components/common/Notification/actions';
import { updateBrand } from '../../../screens/Brands/containers/Create/actions';
import { setValidationErrors } from '../../../store/common/validation/actions';
import { client } from '../../../core/client';

const mstp = (state) => {
    return {
        brands: state.Brands.brandsData
    }
}

const mdtp = (dispatch) => ({
    getBrands: async () => {
        dispatch(getBrands())
    },

    onSubmit: async (brands) => {
        const promises = brands.map(async (brand) => {
            const validation = client.validator.brand.update(brand);
            if (validation.valid) {
                return await dispatch(updateBrand(brand))
            } else {
                dispatch(setValidationErrors(validation.errors));
            }
        })
        await Promise.all(promises);
        dispatch(triggerNotification({
            msg: 'Brands were successfully updated!',
            duration: 3,
            type: 'success'
        }));
    },
})

export default connect(
    mstp,
    mdtp,
)(BrandList)
