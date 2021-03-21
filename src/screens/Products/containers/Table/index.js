import { connect } from 'react-redux';
import React from 'react';
import TableWithLoader from '../../../../../components/TableWithLoader';
import { Dropdown, Menu, Icon } from 'antd';
import { getProduct, triggerDrawer } from '../../CRUD/containers/screen/actions';
import { store } from '../../../../../store';

const menu = (props) => (
    <Menu>
        <Menu.Item key="0">
            <a onClick={() => { store.dispatch(getProduct(props.productId)); store.dispatch(triggerDrawer({ visible: true, action: 'Update', title: 'Edit Product' })); }}>Edit</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <a onClick={() => { store.dispatch(getProduct(props.productId)); store.dispatch(triggerDrawer({ visible: true, action: 'Delete', title: 'Delete Product' })); }}>Delete</a>
        </Menu.Item>
    </Menu>
);

const columns =
    [{
        title: 'Name',
        // dataIndex: 'name',
        sorter: true,
        fixed: 'left',
        key: 'name',
        width: 200,
        render: (record) => (
            <a onClick={() => { store.dispatch(getProduct(record.id)); store.dispatch(triggerDrawer({ visible: true, action: 'Read', title: 'View Product' })); }}>
                {record.name}
            </a>
        )
    }, {
        title: 'Creation Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: timestamp => `${new Date(timestamp).toLocaleDateString()}`,
    }, {
        title: 'Last Modified Date',
        key: 'lastUpdated',
        dataIndex: 'lastUpdated',
        render: timestamp => `${new Date(timestamp).toLocaleDateString()}`
    }, {
        title: '',
        key: 'actions',
        dataIndex: 'id',
        render: productId => (
            <Dropdown overlay={menu({ productId })} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    Actions<Icon type="down" />
                </a>
            </Dropdown>
        ),
        fixed: 'right',
        width:200
    }];

const mapStateToProps = (state) => ({
    loading: state.Products.loading,
    columns: columns,
    scroll: { x: 800}
});

export default connect(mapStateToProps, null)(TableWithLoader);