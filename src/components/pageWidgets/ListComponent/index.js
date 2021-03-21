import React, { Component } from 'react';
import styles from './style.module.css';

class ListComponent extends Component {
    listRow = (props) => {
        return (
            <div className={styles.rowWrapper}>
                <div className={styles.leftPart}>
                    <span className={styles.value}>
                        {props.value}
                    </span>
                    <span className={styles.iconContainer}>
                        {props.icon}
                    </span>
                </div>
                <div className={styles.rightPart}>
                    {props.label}
                </div>
            </div>
        )
    }
    render() {
        let style = {};
        if(this.props.maxHeight) {
            style.maxHeight = this.props.maxHeight;
        }
        if(this.props.scrollable) {
            style.overflowY = 'scroll';
        }
        const rows = this.props.rowData.map((x,i) => {
            return (
                <this.listRow key={i} {...x}/>
            )
        })
        return (
            <div className={styles.listWrapper} style={style}>
                {rows}
            </div>
        );
    }
}

export default ListComponent