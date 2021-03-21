import React, { Component } from 'react';
import styles from './style.module.css';
import {Table, Icon} from 'antd';
class TableWithLoader extends Component {
    constructor(props) {
        super(props);
        const pagination = this.props.pageSize ? { pageSize: this.props.pageSize, itemRender: this.itemRender } : { itemRender: this.itemRender };
        this.state = { pagination };
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    componentDidMount() {

    }
    handleTableChange(pagination) {
        const pager = { ...this.state.pagination };
        // const obj = { ...filters, sorter };
        pager.current = pagination.current;
        pager.itemRender = this.itemRender;
        this.setState({
            pagination: pager
        });
        // this.props.changeDataSource(pager);
        // call the dataSource getter with current pagination and filters here 
    }
    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return (
                <div className={styles.navigationBtn}>
                    <span className={styles.leftArrow}>
                        <Icon type='left' />
                    </span>
                    <span>Previous</span>
                </div>
            )
        } if (type === 'next') {
            return (
                <div className={styles.navigationBtn}>
                    <span>Next</span>
                    <span className={styles.rightArrow}>
                        <Icon type='right' />
                    </span>
                </div>
            )
        }
        return originalElement;
    }
    render() {
        return (
            <div className={styles.tableContainer}>
                <Table
                    border={false}
                    scroll={this.props.scroll}
                    columns={this.props.columns}
                    dataSource={this.props.dataSource}
                    pagination={this.state.pagination}
                    loading={this.props.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
}

export default TableWithLoader
