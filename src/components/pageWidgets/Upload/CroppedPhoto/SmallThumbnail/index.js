import React, { Component } from 'react';
import styles from './style.module.css';

class SmallThumbnail extends Component {

    render() {
        let preview;
        let url = null;
        if (this.props.imageBlob) {
            url = URL.createObjectURL(this.props.imageBlob);
        }
        else if (this.props.imagePreviewSrc) {
            url = this.props.imagePreviewSrc;
        }
        if (url) {
            preview = <div
                className={styles.presetImage}
                style={{
                    backgroundImage: 'url(' + url + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% auto',
                    backgroundPosition: 'center'}}/>

        }
        else {
            preview = <div
                className={styles.presetImage}
                style={{
                    backgroundImage: 'url(' + url + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% auto',
                    backgroundPosition: 'center'}}/>
        }
        return (
            <div className={styles.container}>
                {preview}
            </div>
        )
    }
}

export default SmallThumbnail
