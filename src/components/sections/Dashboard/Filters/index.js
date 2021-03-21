import React, { useEffect } from 'react';
import styles from './style.module.css';
import Dropdown from '../../../pageWidgets/Dropdown';
import DatePicker from '../../../pageWidgets/DatePicker';
import SmallBlueOutline from '../../../pageWidgets/Buttons/SmallBlueOutline';

export default ({
    products = [],
    productId = '',
    startDate,
    endDate,
    loadData = () => {},
    onNewBatchClick = () => {},
    onProductChange = () => {},
    onStartDateChange = () => {},
    onEndDateChange = () => {},
}) => {
    useEffect(() => {
        loadData();
    }, [])
    return (
        <div className={styles.wrapper}>
            <div className={styles.product}>
                <Dropdown
                    allSelectable={true}
                    items={products}
                    value={productId}
                    onChange={onProductChange}
                />
            </div>
            <div className={styles.range}>
                <DatePicker
                    value={startDate}
                    onChange={onStartDateChange}
                />
                <span className={styles.to}>TO</span>
                <DatePicker
                    value={endDate}
                    onChange={onEndDateChange}
                />
            </div>
            <div className={styles.button}>
                <SmallBlueOutline
                    icon={'plus'}
                    title={'new batch'}
                    onClick={onNewBatchClick}
                />
            </div>
        </div>
    )
}