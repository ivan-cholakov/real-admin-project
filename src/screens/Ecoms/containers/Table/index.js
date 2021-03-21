import { connect } from 'react-redux';
import React from 'react';
import TableWithLoader from '../../../../components/pageWidgets/TableWithLoader';
import { Dropdown, Menu, Icon } from 'antd';
import { getEcom } from '../screen/actions';
import { store } from '../../../../store';
import {openDrawer} from "../../../../components/common/drawer/container/actions";



const menu = (props) => (
    <Menu>
        <Menu.Item key="0">
            <a onClick={() => { store.dispatch(getEcom(props.ecomId)); store.dispatch(openDrawer({ visible: true, action: 'Update', title: 'Edit Ecom' })); }}>Edit</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <a onClick={() => { store.dispatch(getEcom(props.ecomId)); store.dispatch(openDrawer({ visible: true, action: 'Delete', title: 'Delete Ecom' })); }}>Delete</a>
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
            <a onClick={() => { store.dispatch(getEcom(record.id)); store.dispatch(openDrawer({ visible: true, action: 'Read', title: 'View Ecom' })); }}>
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
        render: ecomId => (
            <Dropdown overlay={menu({ ecomId })} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    Actions<Icon type="down" />
                </a>
            </Dropdown>
        ),
        fixed: 'right',
        width:200
    }];

const mapStateToProps = (state) => ({
    loading: state.Ecoms.loading,
    columns: columns,
    scroll: { x: 800}
});

export default connect(mapStateToProps, null)(TableWithLoader);
