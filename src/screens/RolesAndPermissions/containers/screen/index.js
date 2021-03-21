import { connect } from 'react-redux';
import RolesAndPermissions from '../..';
import { getPermissions } from './actions';



const mapStateToProps = (state) => ({
    permissions: state.RolesAndPermissions.screen.permissions
});
const mapDispatchToProps = (dispatch) => ({
    getPermissions: () => {
        dispatch(getPermissions());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(RolesAndPermissions);