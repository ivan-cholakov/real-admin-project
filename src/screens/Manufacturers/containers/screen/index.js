import { connect } from 'react-redux';
import ManufacturersList from '../..';
import { triggerDrawer } from '../../CRUD/containers/screen/actions';
import { getBrands } from '../../../../store/common/brands/actions';


const mapStateToProps = (state) => ({
    manufacturersData: state.Manufacturers.manufacturersData,
    brandsList: state.Brands.brandsData
});
const mapDispatchToProps = (dispatch) => ({
    getBrands: () => {
        dispatch(getBrands())
    },
    triggerDrawer: (drawerData) => {
        dispatch(triggerDrawer(drawerData))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturersList);
