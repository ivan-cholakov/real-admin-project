import React, { Component } from 'react';
import styles from './style.module.css';
import phoneTop from '../../../assets/img/phone-top.png';
import phoneBottom from '../../../assets/img/phone-bottom.png';
import { expandIcon, collapseIcon } from '../../../assets/icons/common/icons';

class PhoneScreen extends Component {
    constructor(props) {
        super(props);
        this.contentRef = React.createRef();
        this.heightDiv = React.createRef();
        this.expandHeightDiv = this.expandHeightDiv.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
        this.state = { collapsed: true, contentHeight: 0 };

    }
    handleCollapse(){
        this.setState({collapsed: !this.state.collapsed}, this.expandHeightDiv);
    }
    expandHeightDiv() {
        const contentHeight = this.state.collapsed? 0 : (this.contentRef.current.clientHeight - 400 + 'px');
        this.setState({contentHeight}, () => {this.props.onCollapse(this.state.collapsed)});
    }
    render() {
        const divStyle = {
            height: this.state.contentHeight
        }
        const btnText = this.state.collapsed? 'Expand' : 'Collapse';
        const containerClass = this.state.collapsed === false? styles.expandedPhone : '';
        const contentIndex = this.state.collapsed? 80 : 180;
        let contentStr = '';
        for(let i = 0; i < contentIndex; i++){
            contentStr += 'Product content\r\n\r\n';
        }
        return (

            <div className={styles.phoneWrapper}>
                <div className={styles.phoneTop}>
                    <img src={phoneTop} alt="phone top" />
                </div>
                <div className={[containerClass, styles.contentContainer].join(' ')} ref={this.contentRef}>
                    {contentStr}
                </div>
                <div className={styles.heightDiv} style={divStyle}></div>
                <div className={styles.phoneBottom}>
                    <img src={phoneBottom} alt="phone bottom" />
                </div>
                <div className={styles.expandBtnContainer} onClick={this.handleCollapse}>
                    <span className={styles.expandBtn}>
                        { this.state.collapsed ? expandIcon : collapseIcon}
                    </span>
                    <div className={styles.btnText}>
                        {btnText}
                    </div>
                </div>
            </div>
        );
    }
}

export default PhoneScreen