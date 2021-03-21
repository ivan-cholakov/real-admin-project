import React, { Component } from 'react';
import styles from './style.module.css';
import { withRouter } from 'react-router-dom';


class OnboardingCard extends Component {
    redirect () {
        this.props.history.push(this.props.navigateTo);
    }
    render() {
        return ( 
            <div className={styles.cardHolder}onClick={() => {this.redirect()}}>
                <div className={styles.onboardingCard}>
                    <div className={styles.iconBackground}>
                        <img srcSet={this.props.icon} alt=''/>
                    </div>
                    <div className={styles.title}>{this.props.title}</div>
                </div>
                <p className={styles.cardDescription}>{this.props.description}</p>
            </div>
        );
    }
}

export default withRouter(OnboardingCard);

