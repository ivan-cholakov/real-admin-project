import React, { Component } from 'react';
import styles from './style.module.css';
import GradientCircle from '../../../pageWidgets/GradientCircle';
import { MaleFemale, amcCode } from '../../../../assets/icons/common/icons';
import ListComponent from '../../../pageWidgets/ListComponent';
import qrCode from '../../../../assets/img/common/qr-code.png';
import { Loader } from '../../../common/Loader';

class TotalScans extends Component {
    constructor(props) {
        super(props);
    }
    TotalScans = () => {
        const circlesData = [
            { number: this.props.scans.scans.amc || 0, label: 'AMC', minNumber: 0, maxNumber: 1000, minWidth: 100, maxWidth: 120, icon: amcCode },
            { number: this.props.scans.scans.qr || 0, label: 'QR', minNumber: 0, maxNumber: 1000, minWidth: 100, maxWidth: 120, image: qrCode }
        ]
        const circles = circlesData.map((x, i) => {
            return (
                <GradientCircle key={i} {...x} />
            )
        })
        let rowsData = [];
        for (let key in this.props.scans.counts) {
            const label = key == '5+' ? '5x + buys' : key + 'x buys';
            rowsData.push({
                label,
                value: this.props.scans.counts[key],
                icon: MaleFemale
            })
        }
        return (
            <div className={styles.totalScansWrapper}>
                <div className={styles.title}>
                    Total Scans
                </div>
                <div className={styles.circlesContainer}>
                    {circles}
                </div>
                <div className={styles.listContainer}>
                    <ListComponent rowData={rowsData.reverse()} scrollable={true} maxHeight={230} />
                </div>
            </div>
        )
    }
    Loader = () => {
        return (
            <div className={styles.loader}>
                <Loader/>
            </div>
        )
    }
    render() {
        const currComponent = this.props.scans? <this.TotalScans/> : <this.Loader/>
        return currComponent;
    }
}

export default TotalScans
