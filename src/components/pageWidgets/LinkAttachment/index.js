import React, {Component} from 'react';
import styles from './style.module.css';
import {Tooltip} from 'antd';
import hyperlink from '../../../assets/icons/RichTextEditor/hyperlink.svg';
import attachment from '../../../assets/icons/common/attachment.svg';
import FileUpload from '../Upload/File';


class LinkAttachment extends Component{

    handleFileUpload = files => {
        const [file] = files;
        this.props.onFileChange(file);
    }

    render() {
        const inlineClass = this.props.inline? styles.inline : '';
        const colorClassName = this.props.grayColor? styles.grayColor : '';
        return (
            <div
                className={[styles.textInput, colorClassName, inlineClass, this.props.disabled? 'disabled' : ''].join(' ')}
                ref={this.inputContainer}>
                <div className={[styles.labelContainer, this.props.labelPosition].join(' ')}>
                    <label
                        className={styles.inputLabel}
                        hidden={!this.props.label}>{this.props.label}
                    </label>
                    <Tooltip
                        className={styles['tooltip-title']}
                        overlayClassName={styles.tooltip}
                        placement="rightTop"
                        title={this.props.tooltipContent}>
                        <div>{this.props.tooltipTitle}</div>
                    </Tooltip>
                </div>
                <div className={styles.actionsWrapper}>
                    <span
                        className={[styles.actionButton, this.props.activeHyperlink ? 'active' : ''].join(' ')}
                        onClick={this.props.onClickLink}>
                        <img alt={''} src={hyperlink}/>
                    </span>
                    <span>or</span>
                    <FileUpload
                        onChange={this.handleFileUpload}
                    >
                        <span className={[styles.actionButton, this.props.activeAttachment? 'active' : ''].join(' ')}>
                            <img alt={''} src={attachment}/>
                        </span>
                    </FileUpload>
                </div>
            </div>
        );
    }
}

export default LinkAttachment;
