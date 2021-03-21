import React, { Component } from 'react';
import styles from './style.module.css';

class SubMenuItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleMenuItemClick(this.props.id);
    }

    render() {
        const expandedClass = this.props.collapsed? styles.collapsed : styles.expanded;
        const activeClass = this.props.selected ? styles.activeItem : '';
        return (
            <div className={[expandedClass, styles.itemWrapper, activeClass].join(' ')} onClick={this.handleClick}>
                <div className={styles.label}>
                    {this.props.label}
                </div>
            </div>
        )
    }
}


export default SubMenuItem;