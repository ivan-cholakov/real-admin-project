import React, { Component } from 'react';
import styles from './style.module.css';
import { plus } from '../../../../assets/icons/sideNavigation/addAssets/icons';
import { plusFilled } from '../../../../assets/icons/sideNavigation/addAssets/icons';

class AddButton extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className={styles.button}>
                <div className={styles.leftPart}>
                    {this.props.icon}
                    <div className={styles.title}>
                        {this.props.title}
                    </div>
                </div>
                <div className={styles.rightPart}>
                    <span className={styles.plusOutline}>
                        {plus}
                    </span>
                    <span className={styles.filledPlus}>
                        {plusFilled}
                    </span>
                </div>
            </div>
        )
    }
}

export default AddButton
