import { connect } from 'react-redux';
import EcomsList from '../..';
import { getEcoms } from '../../../../store/common/ecoms/actions';
import {openDrawer} from "../../../../components/common/drawer/container/actions";


const mapStateToProps = (state) => ({
    ecomsData: state.Ecoms.ecomsData
});
const mapDispatchToProps = (dispatch) => ({
    getEcoms: () => {
        dispatch(getEcoms())
    },
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(EcomsList);
