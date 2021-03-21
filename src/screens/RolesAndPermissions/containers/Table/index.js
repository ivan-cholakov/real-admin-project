import { connect } from 'react-redux';
import TableWithLoader from '../../../../components/TableWithLoader';

const mapStateToProps = (state) => ({
    loading: state.RolesAndPermissions.screen.loading,
});
export default connect(mapStateToProps, null)(TableWithLoader);