import { connect } from 'react-redux';
import {openDrawer} from '../../../../../components/common/drawer/container/actions';
import { getTrail } from '../../../../../store/common/trails/actions';
import Transparency from '../';

const mapStateToProps = (state) => ({
    trailsData: state.Trails.trailsData.data
});

const mapDispatchToProps = (dispatch) => ({
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    },
    getTrail: (id) => {
        return dispatch(getTrail(id))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Transparency);