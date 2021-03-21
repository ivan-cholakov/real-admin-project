import React, { Component } from 'react';
import styles from './style.module.css';
import StyledDatePicker from '../../../../pageWidgets/DatePicker';
import CustomDropdown from '../../../../pageWidgets/Dropdown';
import InformationBox from '../../../../pageWidgets/InformationBox';
import TableWithLoader from './containers/Table';
import TopUpWallet from './TopUpWallet';
import DownloadButton from '../../../../pageWidgets/Buttons/Download';

class Transactions extends Component {
    constructor(props){
        super(props);
        this.state = {loading: false};
        this.options = [
            {label: 'All Products', value: 'All products', date:null}
        ]
        this.boxesInfo = [
            {title: 'Spent', cash: '12,509.72', coins: 0.00, label: 'Confirmed spend'},
            {title: 'Held', cash: '12,509.72', coins: 0.00, label: 'Deposited amount'},
            {title: 'Returned', cash: '12,509.72', coins: 0.00, label: 'Non used funds'},
        ];
        this.transcations = [
            {description: 'Batch Tokenisation - 10,000 units of Fact Lime (2%)', date: '12/18/2018', amount: 123},
            {description: 'Batch Tokenisation - 5,000 units of Fact Lime (2%)', date: '12/18/2018', amount: 123},
            {description: 'Batch Tokenisation - 10,000 units of Fact Lime', date: '12/18/2018', amount: 123},
            {description: 'Batch Tokenisation - 10,000 units of Fact Lime (2%)', date: '12/18/2018', amount: 124},
            {description: 'Batch Tokenisation - 5,000 units of Fact Lime (2%)', date: '12/18/2018', amount: 125},
            {description: 'Batch Tokenisation - 10,000 units of Fact Lime', date: '12/18/2018', amount: 126},
            {description: 'Batch Tokenisation - 10,000 units of Fact Lime (2%)', date: '12/18/2018', amount: 127},
            {description: 'Batch Tokenisation - 5,000 units of Fact Lime (2%)', date: '12/18/2018', amount: 128},
            {description: 'Batch Tokenisation - 10,000 units of Fact Lime', date: '12/18/2018', amount: 129},
            {description: 'Batch Tokenisation - 10,000 units of Fact Lime (2%)', date: '12/18/2018', amount: 130},
        ]
    }
    onDateChange = (date) => {
        this.setState({date})
    }
    render() {
        const boxes = this.boxesInfo.map((x,i) => {
            return (
                <InformationBox {...x} key={i} />
            )
        })
        return (
            <div className={styles.contentContainer}>
                <div className={styles.balanceContainer}>
                    <div className={styles.coins}>
                        <span>0.00</span>
                        ALMD
                    </div>
                    <div className={styles.money}>
                        £0.00
                    </div>
                </div>

                <div className={styles.btnContainer}>
                    <TopUpWallet/>
                </div>
                <div className={styles.line} />
                <div className={styles.overview}>
                    <div className={styles.sectionTitle}>
                        Transactions Overview
                    </div>
                    <div className={styles.filters}>
                        <div className={styles.label}>
                            Since
                        </div>
                        <div className={styles.calendar}>
                            <StyledDatePicker placeholder={'DD/MM/YYYY'} onChange={this.onDateChange}/>
                        </div>
                        <div className={styles.label}>
                            For
                        </div>
                        <div className={styles.dropdownContainer}>
                            <CustomDropdown placeholder={'All products'} items={this.options} onChange={(val) => val}/>
                        </div>
                    </div>
                    <div className={styles.boxesContainer}>
                        {boxes}
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.breakdownContainer}>
                        <div className={styles.heading}>
                            <div className={styles.title}>Breakdown</div>
                            <div className={styles.download}>
                                <DownloadButton title={'download'}/>
                            </div>
                        </div>
                        <div className={styles.tableContainer}>
                            <TableWithLoader
                                pagination={'simple'}
                                dataSource={this.transcations}
                                loading={this.state.loading}
                                pageSize={3}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transactions;

