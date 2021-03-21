import { connect } from 'react-redux';
import ProductFinder from '../';
import {openDrawer} from '../../../../../components/common/drawer/container/actions';
import { getStockist } from '../../../../../store/common/stockists/actions';
import { getEcom } from '../../../../../store/common/ecoms/actions';

const mapStateToProps = (state) => ({
    stockistsData: state.Stockists.stockistsData.data,
    ecomsData: state.Ecoms.ecomsData.data,
});

const mapDispatchToProps = (dispatch) => ({
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    },
    getStockist: (id) => {
        return dispatch(getStockist(id))
    },
    getEcom: (id) => {
        return dispatch(getEcom(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductFinder);