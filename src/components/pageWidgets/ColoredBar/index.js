import React, { Component } from 'react';
import styles from './style.module.css';

class ColoredBar extends Component {
    // example data to work with Component
    // {   width: '300px', 
    //     sections:{
    //         {width:50, color:red},
    //         {width:50, color: blue}
    // }}
    constructor(props) {
        super(props);

    }
    barSection = (props) => {
        const barSectionStyles = {
            width: props.width+'%',
            backgroundColor: props.color
        }
        return (
            <div className={styles.barSection} style={barSectionStyles}/>
        )
    }
    render() {
        const barStyle = {
            width: this.props.width? this.props.width : '100%',
            height: this.props.height? this.props.height : '13px'
        }
        const sections = this.props.sections.map((x,i) => {
            return (
                <this.barSection {...x} key={i}/>
            )
        })
        return (
            <div className={styles.barWrapper} style={barStyle}>
                {sections}
            </div>
        );
    }
}

export default ColoredBar