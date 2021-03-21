import styles from './style.module.css';
import StatusComponent from '../../../pageWidgets/StatusComponent';
import React from 'react';
import TextInput from '../../../pageWidgets/TextInput';
import ConversionCircle from '../../ConversionCircle';

export const activityColumns = [{
    title: 'Product',
    dataIndex: 'product',
    key: 'product',
    width: 180,
    render: (value, record) => {
        return (
            <span>
                {value? value.displayName : ''}
            </span>
        )
    }
}, {
    title: 'Batch',
    dataIndex: 'batch',
    key: 'batch',
    width: 90,
    render: (value, record) => {
        return (
            <span className={styles.batchId}>
                {value}
            </span>
        )
    }
}, {
    title: 'Units',
    dataIndex: 'units',
    key: 'units',
    width: 90
}, {
    title: 'Rewards',
    key: 'rewards',
    width: 130,
    options: '',
    dataIndex: 'rewards',
    render: (value, record) => {
        return (
            <span className={styles.textInput}>
                <TextInput onChange={(value) => console.log(value)} value={'2%'}/>
            </span>
        )
    }
},
{
    title: 'Reward spend',
    key: 'rewardSpend',
    width: 150,
    options: '',
    dataIndex: 'rewardSpend',
    render: (value, record) => {
        return (
            <span>
                {value}
            </span>
        )
    }
},
{
    title: 'AMC Scans',
    key: 'amc',
    width: 90,
    options: '',
    dataIndex: 'amc',
    render: (value, record) => {
        return (
            <span>
                <span className={styles.amcLabel}>{value[0].label}</span>
                <span className={styles.amcImage}><img src={value[0].image}/></span>
            </span>
        )
    }
},
{
    title: 'QR Scans',
    key: 'qr',
    width: 90,
    options: '',
    dataIndex: 'qr',
    render: (value, record) => {
        return (
            <span>
                <span className={styles.amcLabel}>{value[0].label}</span>
                <span className={styles.amcImage}><img src={value[0].image}/></span>
            </span>
        )
    }
},
{
    title: 'Conversion',
    key: 'conversion',
    width: 90,
    options: '',
    dataIndex: 'conversion',
    render: (value, record) => {
        return (
            <span>
                <ConversionCircle label={value}/>
            </span>
        )
    }
},{
    title: 'Status',
    key: 'status',
    dataIndex: ' status',
    width: 100,
    render: (value, record) => {
        return <StatusComponent active={record.active} />
    }
}];
