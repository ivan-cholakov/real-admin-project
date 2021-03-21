import React, { Component } from 'react';
import { Tabs } from 'antd';
import UsersScreen from '../../components/sections/Admin/Users/containers/screen';
import styles from './style.module.css';
import Account from '../../components/sections/Admin/Account/container';
import Wallet from '../../components/sections/Admin/Wallet';
import Settings from '../../components/sections/Admin/Settings';
import { withRouter } from 'react-router-dom';


const TabPane = Tabs.TabPane;
class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: null };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.tabs = [
            { name: 'WALLET', key: '1', component: Wallet, route: '/admin/wallet' },
            { name: 'USERS', key: '2', component: UsersScreen, route: '/admin/users' },
            { name: 'ACCOUNT', key: '3', component: Account, route: '/admin/account' },
            { name: 'SETTINGS', key: '4', component: Settings, route: '/admin/settings' },
        ]
    }
    componentDidMount() {
        this.handleLocationChange();
    }
    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.handleLocationChange();
        }
    }

    handleTabChange(key) {
        this.setState({tabIndex:key});
        const match = this.tabs.find((x) => {
            return x.key === key
        })
        if (match) {
            this.props.history.push(match.route);
            // this.props.changeAdminActive(+key-1);
        }
    }
    handleLocationChange() {
        const currentLocation = this.props.location.pathname;
        const match = this.tabs.find((x) => {
            return x.route === currentLocation;
        });

        if (match) {
            this.setState({ tabIndex: match.key });
        }
    }
    render() {
        const tabs = this.tabs.map((x, i) => {
            return (
                <TabPane tab={x.name} key={(i + 1).toString()}><x.component route={x.route} /></TabPane>
            )
        })
        return (
            <div className={styles.AdminWrapper}>
                <Tabs onChange={this.handleTabChange} activeKey={this.state.tabIndex} size={'large'}>
                    {tabs}
                </Tabs>
            </div>
        );
    }
}

export default withRouter(Admin);
