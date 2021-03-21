import React, { Component } from 'react';
import styles from './style.module.css';

class SectionTitle extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <h1 className={styles.sectionTitle}>{this.props.title}</h1>
            </div>
        );
    }
}

export default SectionTitle
