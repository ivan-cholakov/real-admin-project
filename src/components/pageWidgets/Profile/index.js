import React, { Component } from 'react';
import styles from './style.module.css';
import { Avatar, Popover, Icon } from 'antd';
import ProfileMenu from './menu';
import {store} from '../../../store';
import {getUser} from '../../../screens/Users/containers/screen/actions';
import {openDrawer} from '../../common/drawer/container/actions';
import { Config } from '../../../core/config';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

class Profile extends Component {
    constructor(props) {
        super(props);

        const { profileImage } = props.user;
        this.avatarSrc = profileImage ?
            `${baseUrl}${profileImage}?token=${this.props.user.session.id}` :
            '';
            
        this.profileName = 'John Doe';
        this.state = { clicked: false };

        this.hide = this.hide.bind(this);
        this.handleClickChange = this.handleClickChange.bind(this);
        

    }
    hide() {
        this.setState({ clicked: false })
    }
    handleClickChange(visible) {
        this.setState({
            clicked: visible
        });
    }

    renderPopoverContent = () => (
        <ProfileMenu
            openDrawer={() => {
                store.dispatch(getUser(this.props.user.id),
                    this.props.getRoles())
                    .then(() => {
                        store.dispatch(openDrawer(
                            { action: 'read', title: 'Read User', type: 'user', className: 'userDrawer' }
                        ))
                    })
            }}
            changeTitle={this.props.changeTitle}
            hidePopover={this.hide}
            changeNavActive={this.props.changeNavActive}
            signOut={this.props.signOut}
        />
    )

    render() {
        const displayName = (this.props.user.firstName && this.props.user.lastName) ?
            `${this.props.user.firstName} ${this.props.user.lastName}` :
            this.props.user.username;

        const openSubmenuClass = !this.state.clicked ? 
            '' : 
            (' ' + styles.shinyProfile);
    
        const avatarSrc = this.props.user.profileImage ? 
            `${baseUrl}${this.props.user.profileImage}?token=${this.props.user.session.id}` :
            '';
    
        const avatar = avatarSrc ?
            <Avatar src={avatarSrc} size={32} /> :
            <Avatar size={32} icon='user' />
        return (
            <div className={styles.fullHeight + openSubmenuClass}>
                {this.props.clickable !== false &&
                    <Popover
                        onVisibleChange={this.handleClickChange}
                        visible={this.state.clicked}
                        content={this.renderPopoverContent()}
                        trigger={'click'}>
                        <div className={styles.profileWrapper}>
                            <div>
                                {avatar}
                                <div className={styles.profileName}>
                                    <span className={styles.nameContainer}>
                                        {displayName}
                                    </span>
                                    <Icon type="down" />
                                </div>
                            </div>
                        </div>
                    </Popover>
                }
                {this.props.clickable === false &&
                    <div className={styles.unclickableProfileWrapper}>
                        {avatar}
                        <div className={styles.profileName}>
                            {displayName}
                        </div>
                    </div>
                }

            </div>
        );
    }
}

export default Profile
