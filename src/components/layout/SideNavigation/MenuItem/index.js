import React, { Component } from 'react';
import styles from './style.module.css';
import { downArrow } from '../../../../assets/icons/common/icons';
class MenuItem extends Component {
    render() {
        const expandedClass = this.props.collapsed ? styles.collapsed : styles.expandedNavItem;
        const activeClass = this.props.selected ? styles.activeItem : '';
        const arrowClass = this.props.active? styles.rotateArrow : '';
        const activeExpanded = (activeClass && !this.props.collapsed)? styles.expandedActive : '';
        const handleClick = () => {
            if(this.props.handleClick) {
                this.props.handleClick();
            }
            else {
                this.props.handleMenuItemClick(this.props.id)
            }
        }
        return (
            <div className={styles.navItem + ' ' + expandedClass + ' ' +activeClass + ' ' +activeExpanded} onClick={() => {handleClick()}}>
                <span>
                    {this.props.icon}
                    {!this.props.collapsed &&
                        <div className={styles.navLabel}>
                            {this.props.label}
                        </div>
                    }
                    <div className={styles.tooltip}>
                        <div className={styles.tooltipInner}>
                            {this.props.label}
                        </div>
                    </div>
                    {this.props.expandable &&
                        <div className={[styles.expandArrow, arrowClass].join(' ')}>
                            {downArrow}
                        </div>
                    }
                    
                </span>
            </div>
        );
    }
}
export default MenuItem;