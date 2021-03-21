import React, { Component } from 'react';
import styles from './style.module.css';
import CreateCompany from './containers/Create';
import { withRouter } from 'react-router-dom';

class CreateCompanyScreen extends Component {
    render() {
        return (
            <div className={styles.screenWrapper}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.screenHeading}>Please create a Company.</h1>
                    <CreateCompany history={this.props.history} />
                </div>
            </div>
        )
    }
}



export default withRouter(CreateCompanyScreen)
