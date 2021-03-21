import React, {Component} from 'react';
import styles from './style.module.css';
import logo from '../../../assets/img/logo-header-white';
import Profile from '../../pageWidgets/Profile';

class OnboardingHeader extends Component {
    render() {
        const showUser = this.props.showUser;
        return(

            <div className={styles.headerWrapper}>
                <div className={styles.logoContainer}>
                    {logo}
                </div>

                <div className={styles.titleContainer}>
                    {this.props.title}
                </div>
                
                <div className={styles.profileContainer}>
                    {showUser &&
                        <Profile
                            clickable={true}
                            user={this.props.userProfile}
                            signOut={this.props.signOut}
                            getRoles={this.props.getRoles}
                            changeNavActive={this.props.changeNavActive}
                            changeTitle={this.props.changeTitle}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default OnboardingHeader
