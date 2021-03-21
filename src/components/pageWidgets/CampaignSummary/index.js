import React, { Component } from 'react';
import styles from './style.module.css';
import { SummaryRow } from './SummaryRow';
class CampaignSummary extends Component {

    render() {
        const rules = this.props.rules.map((x, i) => {
            return (
                <SummaryRow index={i} key={i} text={x.text} />
            )
        })
        return (
            <div className={styles.summaryWrapper}>
                <h1 className={styles.title}>Summary</h1>
                <div className={styles.rulesContainer}>
                    {rules}
                </div>
            </div>
        )
    }
}



export default CampaignSummary
