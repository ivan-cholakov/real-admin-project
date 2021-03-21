import React, { Component } from 'react';
import styles from './style.module.css';
import earthImg from '../../../assets/img/earth_white.png';
import CreateAccount from './containers/CreateAccount';
import SocialSignUp from './containers/SocialSignUp';
import { withRouter } from 'react-router-dom';
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedTab: 'Account'};
        this.switchTab = this.switchTab.bind(this);
        this.accountTabRef = React.createRef();
        this.socialTabRef = React.createRef();

    }
    switchTab(tabStr){
        if(tabStr === 'Account' && this.state.selectedTab !== tabStr){
            this.accountTabRef.current.classList.add(styles.activeTab);
            this.socialTabRef.current.classList.remove(styles.activeTab);
        }
        if(tabStr === 'Social' && this.state.selectedTab !== tabStr){
            this.accountTabRef.current.classList.remove(styles.activeTab);
            this.socialTabRef.current.classList.add(styles.activeTab);
        }
        this.setState({selectedTab: tabStr});
    }
    render() {
        const formComponent = this.state.selectedTab === 'Account' ? <CreateAccount history={this.props.history}/> : <SocialSignUp/>
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.innerWrapper}>
                    <div className={styles.leftContainer}>
                        <div className={styles.headingsContainer}>
                            <h1>Almond</h1>
                            <h2>Changing the world one scan at a time.</h2>
                        </div>
                        <img src={earthImg} className={styles.earthImg} alt="Almond Banner" />
                    </div>
                    <div className={styles.rightContainer}>
                        <div className={styles.navContainer}>
                            <div ref={this.accountTabRef} onClick={() => {this.switchTab('Account')}} className={`${styles.navTab} ${styles.leftTab} ${styles.activeTab}`}>
                                Create Account
                            </div>
                            <div ref={this.socialTabRef} onClick={() => {this.switchTab('Social')}} className={`${styles.navTab} ${styles.rightTab}`}>
                                Use your Socials
                            </div>
                        </div>
                        {formComponent}
                    </div>
                </div>
                

            </div>

        );
    }
}

export default withRouter(SignUp)
