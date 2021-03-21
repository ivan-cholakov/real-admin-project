import { connect } from 'react-redux';
import React from 'react';
import TableWithLoader from '../../../../components/pageWidgets/TableWithLoader';
import { Dropdown, Menu, Icon } from 'antd';
import { getTrail } from '../screen/actions';
import { store } from '../../../../store';
import {openDrawer} from "../../../../components/common/drawer/container/actions";



const menu = (props) => (
    <Menu>
        <Menu.Item key="0">
            <a onClick={() => { store.dispatch(getTrail(props.trailId)); store.dispatch(openDrawer({ visible: true, action: 'Update', title: 'Edit Trail' })); }}>Edit</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <a onClick={() => { store.dispatch(getTrail(props.trailId)); store.dispatch(openDrawer({ visible: true, action: 'Delete', title: 'Delete Trail' })); }}>Delete</a>
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
            <a onClick={() => { store.dispatch(getTrail(record.id)); store.dispatch(openDrawer({ visible: true, action: 'Read', title: 'View Trail' })); }}>
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
        render: trailId => (
            <Dropdown overlay={menu({ trailId })} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    Actions<Icon type="down" />
                </a>
            </Dropdown>
        ),
        fixed: 'right',
        width:200
    }];

const mapStateToProps = (state) => ({
    loading: state.Trails.loading,
    columns: columns,
    scroll: { x: 800}
});

export default connect(mapStateToProps, null)(TableWithLoader);
