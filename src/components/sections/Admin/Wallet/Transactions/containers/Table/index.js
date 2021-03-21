import { connect } from 'react-redux';
import React from 'react';
import TableWithLoader from '../../../../../../pageWidgets/TableWithLoader';
import styles from '../../style.module.css';


const columns =
    [
        {
            title: 'Description',

            dataIndex: 'description',
            key: 'description',
            width: 400,
            render: (description) => (
                <span className={styles.descriptionColumn}>
                    {description}
                </span>
            )
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
            render: timestamp => (
                <span className={styles.timestampColumn}>
                    {timestamp}
                </span>
            )
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width:100,
            render: amount => (
                <span className={styles.amountColumn}>
                    {amount}
                </span>
            )
        },
    ];

const mapStateToProps = () => ({
    columns: columns
});

export default connect(mapStateToProps, null)(TableWithLoader);
