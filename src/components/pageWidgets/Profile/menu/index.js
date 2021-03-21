import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

import styles from './style.module.css';
import { Menu } from 'antd';

class ProfileMenu extends Component {
    constructor(props){
        super(props);
        this.handleProfileMenuClick = this.handleProfileMenuClick.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.profileMenuTitles = [
            '',
            'My Profile',
            'Change Password',
            'Sign Out'
        ]
    }
    componentDidUpdate() {
    }
    handleProfileMenuClick(item){
        this.props.hidePopover();
        this.props.changeNavActive();
        this.props.changeTitle(this.profileMenuTitles[item.key]);
    }
    handleSignOut() {
        this.props.signOut();
    }
    render() {
        return (
            <div className={styles.menuWrapper}>
                <Menu selectedKeys={['0']}>
                    <Menu.Item key='1' onClick = {this.handleProfileMenuClick}>
                        <span onClick={this.props.openDrawer}>
                            My profile
                        </span>
                    </Menu.Item>
                    <Menu.Item key='2' onClick = {this.handleProfileMenuClick}>
                        <Link to='/help'>
                            Help
                        </Link>
                    </Menu.Item>
                    <Menu.Item key='3' onClick = {this.handleSignOut}>
                        Log Out
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(ProfileMenu);
