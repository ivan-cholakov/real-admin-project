import { connect } from 'react-redux';
import UsersList from '../..';
import { triggerDrawer } from '../../containers/screen/actions';
import {getRoles, getUsers} from '../../../../store/common/users/actions';
import { getBrands } from '../../../../store/common/brands/actions';


const mapStateToProps = (state) => ({
    usersData: state.Users.usersData,
    brandsList: state.Brands.brandsData
});
const mapDispatchToProps = (dispatch) => ({
    getUsers: () => {
        dispatch(getUsers())
    },
    getBrands: () => {
        dispatch(getBrands())
    },
    triggerDrawer: (drawerData) => {
        dispatch(triggerDrawer(drawerData))
    },
    getRoles: () => {
        dispatch(getRoles())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
