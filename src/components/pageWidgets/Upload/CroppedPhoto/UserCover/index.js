import React, { Component } from 'react';
import styles from './style.module.css';
import { Avatar } from 'antd';
class UserCover extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.value === this.props.value) {
            return false;
        }
        return true;
    }

    render() {
        let preview;
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
        if (imgUrl) {
            preview = <div
                className={styles.presetImage}
                style={{
                    backgroundImage: 'url(' + imgUrl + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center'}}/>

        }
        else {
            preview = (<div className={styles.btnContainer}>
                <Avatar icon={'edit' } /> edit image
            </div>)
        }
        return (
            <div className={styles.container}>
                {preview}
            </div>
        )
    }
}

export default UserCover
