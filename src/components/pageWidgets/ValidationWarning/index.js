import React, { Component } from 'react';
import styles from './style.module.css';
class ValidationWarning extends Component {
    render() {
        return (
            <div className={styles.warningContainer}>
                {this.props.warning}
            </div>
        );
    }
}

export default ValidationWarning
