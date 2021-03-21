import {connect} from 'react-redux';
import Users from '../../index';
import {getRoles, getUsers} from '../../../../store/common/users/actions';

const mapStateToProps = (state) => ({
    usersData: state.Users.usersData
});

const mapDispatchToProps = (dispatch) => ({
    getUsers: () => {
        dispatch(getUsers())
    },
    getRoles: () => {
        dispatch(getRoles())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
