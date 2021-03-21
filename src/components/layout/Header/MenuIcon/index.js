import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './style.module.css';

class MenuIcon extends Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidUpdate(prevProps) {
        if(prevProps.collapsed !== this.props.collapsed) {
            this.buttonRef.current.classList.toggle(styles.change);
        }
    }

    handleClick() {
        this.props.onClick();
    }

    render() {
        return (
            <span ref={this.buttonRef} className={styles.container} onClick={this.handleClick} id="menuIcon">
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </span>
        )
    }
}

const mapStateToProps = (state) => ({
    collapsed: state.SideNavigation.collapsed
});



export default connect(mapStateToProps, null)(MenuIcon);
