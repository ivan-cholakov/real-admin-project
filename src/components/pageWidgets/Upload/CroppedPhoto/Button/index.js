import React, { Component } from 'react';
import styles from './style.module.css';
import BlueOutlineButton from '../../../Buttons/BlueOutline';
import { Avatar } from 'antd';


class Button extends Component {

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
                        <img src={imgUrl} alt=''/>
                        <div className={styles.btnContainerEdit}>
                            <Avatar icon={'edit'} /> edit image
                        </div>
                    </div>
                }
                {!imgUrl &&
                    <div className={styles.btnContainer}>
                        <BlueOutlineButton icon={'plus'} title={this.props.label} />
                    </div>
                }
            </div>
        )
    }
}

export default Button
