import React, { Component } from 'react';
import styles from './style.module.css';

class Analytics extends Component {
    render() {
        return (
            <div>
                <div className={styles.title}>Hi from Analytics screen</div>
                {/* <div className={styles.carouselContainer}>
                    <CardCarousel settings = {settings}/>
                </div> */}
                <div style={{height:'600px'}}></div>

            </div>
        );
    }
}

export default Analytics;
