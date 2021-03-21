import React, {Component} from 'react';
import styles from './style.module.css';

class SectionDivider extends Component{
    render() {
        return (
            <div className={styles.dividerWrapper}>
                <div className={styles.dividerButtonWrapper}>
                    <img alt={''} className={styles.dividerIcon} src={this.props.icon}/>
                    <span className={styles.titleContainer}>
                        <span className={styles.dividerTitle}>{this.props.title}</span>
                    </span>
                </div>
            </div>
        );
    }
}

export default SectionDivider
