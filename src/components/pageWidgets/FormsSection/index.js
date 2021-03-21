import React, { Component } from 'react';
import styles from './style.module.css';

class FormsSection extends Component {
    render() {
        const containerClass = this.props.backgroundStyle === 'grey'? styles.grey : styles.white;
        return (
            <div className={[this.props.className, containerClass].join(' ')}>
                <section className={'section'}>
                    <div className={styles.sectionContentWrapper}>
                        {this.props.children}
                    </div>
                </section>
            </div>
        );
    }
}

export default FormsSection
