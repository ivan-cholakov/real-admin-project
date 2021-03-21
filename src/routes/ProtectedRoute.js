import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import { Loader } from '../components/common/Loader';

class ProtectedRoute extends Component {
    render() {
        const props = this.props;

        if (props.isLoading) {
            return <Loader />;
        }

        if (!props.userProfile.error && Object.keys(props.userProfile).length > 0) {
            if (
                props.userProfile.permissions.map(p => p.name).includes('superadmin') &&
        props.path !== '/system' &&
        props.path !== '/system/invite/company'
            ) {
                return <Redirect to={{ pathname: '/system/invite/company' }} />;
            }
            return <Route {...props} />;
        } else {
            return <Redirect to={{ pathname: '/sign-in' }} />;
        }
    }
}
const mapStateToProps = state => ({
    userProfile: state.User.userProfile,
    isLoading: state.User.loading
});

export default connect(mapStateToProps)(ProtectedRoute);
