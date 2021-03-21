import { connect } from 'react-redux';
import TrailsList from '../..';
import { getTrails } from '../../../../store/common/trails/actions';
import {openDrawer} from "../../../../components/common/drawer/container/actions";


const mapStateToProps = (state) => ({
    trailsData: state.Trails.trailsData
});
const mapDispatchToProps = (dispatch) => ({
    getTrails: () => {
        dispatch(getTrails())
    },
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TrailsList);
