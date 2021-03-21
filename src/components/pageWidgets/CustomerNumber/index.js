import React, { Component } from 'react';
import styles from './style.module.css';

class CustomerNumber extends Component {
    render() {
        return (
            <span className={styles.customerNumberContainer}>
                <div>
                Customer Number <span>{this.props.customerNumber}</span>
                </div>
            </span>
        )
    }
}

export default CustomerNumber
