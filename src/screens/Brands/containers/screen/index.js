import { connect } from 'react-redux';
import BrandsList from '../..';
import { openDrawer } from '../../../../components/common/drawer/container/actions';
import { getBrands } from '../../../../store/common/brands/actions';


const mapStateToProps = (state) => ({
    brandsData: state.Brands.brandsData
});
const mapDispatchToProps = (dispatch) => ({
    getBrands: () => {
        dispatch(getBrands())
    },
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BrandsList);