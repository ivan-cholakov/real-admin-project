import React, { Component } from 'react';
import styles from './style.module.css';
import SmallBlueOutlineButton from '../../../Buttons/SmallBlueOutline';

class SmallerButton extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.value === this.props.value) {
            return false;
        }
        return true;
    }

    render() {
        const val = this.props.value;
        let imgUrl;
        if(val){
            if(typeof val === 'string'){
                imgUrl = val;
            }
            else {
                imgUrl = URL.createObjectURL(val);
            }
        }
        return (
            <div className={styles.wrapper}>
                {imgUrl &&
                    <div className={styles.imgContainer}>
                        <img src={imgUrl} alt='' />
                    </div>
                }
                {!imgUrl &&
                    <div className={styles.btnContainer}>
                        <SmallBlueOutlineButton icon={'plus'} title={this.props.label} />
                    </div>
                }
            </div>
        )
    }
}

export default SmallerButton
