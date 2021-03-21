import React, { Component } from 'react';
import styles from './style.module.css';
import { Avatar } from 'antd';
class Cover extends Component {

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
            <div className={styles.container}>
                {imgUrl &&
                    <div className={styles.imgContainer}>
                        <img src={imgUrl} style={{width: '100%'}} alt=''/>
                        <div className={styles.btnContainerEdit}>
                            <Avatar icon={'edit' } /> edit cover
                        </div>
                    </div>
                }

                {!imgUrl &&
                    <div className={styles.btnContainer}>
                        <Avatar icon={'plus'} /> add cover
                    </div>
                }
            </div>
        )
    }
}

export default Cover
