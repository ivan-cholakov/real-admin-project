import React, { Component } from 'react';
import styles from './style.module.css';
import { Avatar } from 'antd';

class Thumbnail extends Component {

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
            <div className={[styles.triggerUploadButton, this.props.grayColor?styles.grayColor:''].join(' ')}>
                {!imgUrl &&
                    <div className={styles.label}>
                        {this.props.title}
                    </div>
                }
                {imgUrl &&
                    <div className={styles.imagePreview} style={{background: 'url(' + imgUrl + ')'}}>
                        <div className={styles.btnContainerEdit}>
                            <Avatar icon={'edit' } /> edit image
                        </div>
                    </div>
                    
                }
            </div>
        );
    }
}

export default Thumbnail
