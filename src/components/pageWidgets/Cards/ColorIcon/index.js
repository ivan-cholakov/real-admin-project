import React, { Component } from 'react';
import styles from './style.module.css';


class ColorIconCard extends Component {
    //available props : 
    //bgColor 
    //color
    //icon
    //label
    //value
    render() {
        const color = this.props.color? this.props.color : '#fff';
        const backgroundColor = this.props.bgColor? this.props.bgColor : '#373D5B';
        return ( 
            <div className={styles.cardWrapper} style={{color, backgroundColor}}>
                <div className={styles.iconContainer}>
                    {this.props.icon}
                </div>
                <div className={styles.label}>
                    {this.props.label}
                </div>
                <div className={styles.value}>
                    {this.props.value}
                </div>

            </div>
        );
    }
}

export default ColorIconCard

