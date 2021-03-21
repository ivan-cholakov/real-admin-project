import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { connect, ReactReduxContext } from 'react-redux';
import { Route, Switch } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import { history } from '../store/';
import { setToken } from './actions';
import { getProfile, setUserLoading } from '../store/common/user/actions';
import ViewWrapper from '../components/ViewWrapper/containers/screen';
import SystemViewWrapper from '../components/SystemViewWrapper/containers/screen';
import OwnerAccount from '../screens/Onboarding/UserAccount/containers/screen/OwnerAccount';
import EmployeeAccount from '../screens/Onboarding/UserAccount/containers/screen/EmployeeAccount';
import SignIn from '../screens/Auth/SignIn';
import ForgottenPassword from '../screens/Auth/ForgottenPassword/containers/screen';
import PasswordRecovery from '../screens/Auth/PasswordRecovery/containers/screen';
import CreateCompanyScreen from '../components/entityActions/Companies/CreateCompanyScreen/containers/screen';
import CompanyAccount from '../screens/Onboarding/CompanyAccount/containers/screen';

class Routes extends Component {
    componentDidMount() {
        const token = window.localStorage.getItem('session');
        if (token) {
            this.props.setToken(token);
            this.props.getProfile();
        } else {
            this.props.setUserLoading(false);
        }
    }

    render() {
        return (
            <ConnectedRouter history={history} context={ReactReduxContext}>
                <Switch>
                    <Route exact path="/onboarding/user" component={EmployeeAccount} />
                    <Route exact path="/onboarding/company" component={CompanyAccount} />
                    <Route exact path="/onboarding/owner" component={OwnerAccount} />
                    <Route exact path="/sign-in" component={SignIn} />
                    <Route
                        exact
                        path="/forgotten-password"
                        component={ForgottenPassword}
                    />
                    <Route
                        exact
                        path="/password/recovery/verify/:token"
                        component={PasswordRecovery}
                    />
                    <ProtectedRoute
                        exact
                        path="/create-company"
                        component={CreateCompanyScreen}
                    />

                    <ProtectedRoute
                        exact
                        path="/test"
                        component={() => <h1>outsider</h1>}
                    />
                    <ProtectedRoute path="/system" component={SystemViewWrapper} />
                    <ProtectedRoute path="/" component={ViewWrapper} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setToken: token => {
        dispatch(setToken(token));
    },
    getProfile: () => {
        dispatch(getProfile());
    },
    setUserLoading: val => {
        dispatch(setUserLoading(val));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(Routes);
