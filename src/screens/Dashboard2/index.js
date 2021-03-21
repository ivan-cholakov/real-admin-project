import React, { Component } from 'react';
import _ from 'lodash';
import styles from './style.module.css';
import TotalScans from '../../components/sections/Dashboard/TotalScans';
import Segmentation from '../../components/sections/Dashboard/Segmentation';
import Map from './containers/map';
import Filters from './containers/filters';
import ActivityTable from '../../components/pageWidgets/ActivityTable';
import amcCode from '../../assets/img/amc-code.svg';
import shortId from 'shortid'
import { client } from '../../core/client';


class Dashboard extends Component {
    componentDidMount() {
        const { from, to } = this.props.filters;
        let { productId } = this.props.filters;
        const options = new client.QueryOptions({
            filter: { type: 'range', start: from.valueOf(), end: to.valueOf(), field: 'createdAt' }
        })
        if (productId === 'all') {
            productId = null;
        }
        this.props.getBatches(productId, options);
        this.props.getProducts(productId, options);
        this.props.getScans(productId, options);
        this.props.getSegmentation(productId, options);
    }

    componentDidUpdate(prevProps) {
        const same = _.isEqual(prevProps.filters, this.props.filters);
        if (!same) {
            const { from, to } = this.props.filters;
            let { productId } = this.props.filters;
            const options = new client.QueryOptions({
                filter: { type: 'range', start: from.valueOf(), end: to.valueOf(), field: 'createdAt' }
            })
            if (productId === 'all') {
                productId = null;
            }
            this.props.getBatches(productId, options);
            this.props.getProducts(productId, options);
            this.props.getScans(productId, options);
            this.props.getSegmentation(productId, options);
        }
    }

    formatTableData = (tableData) => {
        if(!tableData){
            tableData = []
        }
        let tableDataArray = [];
        tableData.map(data => {
            let tableRow = {
                key: shortId.generate(),
                id: data.id,
                product: this.props.products.find(
                    function(product) {
                        return product.id === data.productId
                    }),
                batch: data.number,
                units: data.itemsCount,
                rewardSpend: '£' + data.spentReward.amount + ' of ' + '£' + data.maxReward.amount,
                amc: [{label: data.scannedItems, image: amcCode}],
                qr: [{label: 0, image: amcCode}],
                active: data.active,
                conversion: '1.4%'
            }
            tableDataArray.push(tableRow);
        });
        return tableDataArray;
    };

    render() {
        return (
            <div className={styles.dashboardWrapper}>
                <div className={styles.header}>
                    <Filters />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.widgetRow}>
                        <div className={styles.totalScansContainer}>
                            <TotalScans scans={this.props.scans}/>
                        </div>  
                        <div className={styles.segmentationContainer}>
                            <Segmentation people={this.props.segmentation}/>
                        </div>
                        <div className={styles.locationContainer}>
                            <Map/>
                        </div>
                    </div>
                    <div className={styles.dashboardTable}>
                        <div className={styles.title} style={{paddingTop: '50px', marginBottom: '-25px'}}>
                            Batch Activity
                        </div>
                        <div className={styles.tableContainer} style={{width: '100%'}}>
                            <ActivityTable dataSource={this.formatTableData(this.props.batches)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
