import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './style.module.css';
import earthImg from '../../../assets/img/earth_white.png';
import AccountLogin from './containers/AccountLogin';
class SignIn extends Component {
    render() {
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
                        <AccountLogin history={this.props.history}/>
                    </div>
                </div>
                

            </div>

        );
    }
}

export default withRouter(SignIn)
