import React, { Component } from 'react';
import styles from './style.module.css';
import UploadFormLayout from '../../FormLayout';
import { editIcon2 } from '../../../../../assets/icons/common/icons';
import { Avatar } from 'antd';

class DefaultLayout extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.value === this.props.value) {
            return false;
        }
        return true;
    }

    render() {
        const val = this.props.value;
        let imgUrl;
        if (val) {
            if (typeof val === 'string') {
                imgUrl = val;
            }
            else {
                imgUrl = URL.createObjectURL(val);
            }
        }
        return (
            <div className={styles.mediaContainer}>
                {!imgUrl &&
                    <UploadFormLayout title={this.props.title} />
                }
                {imgUrl &&
                    <div className={styles.presetImage} style={{ background: 'url(' + imgUrl + ')' }}>
                    <div className={styles.btnContainerEdit}>
                        <Avatar icon={'edit' } /> edit image
                    </div>
                        {/* <div className={styles.iconContainer}>
                            <div className={styles.icon}>
                                {editIcon2}
                            </div>
                            <div className={styles.caption}>
                                edit
                            </div>
                        </div> */}
                    </div>
                }
            </div>
        )
    }
}

export default DefaultLayout
