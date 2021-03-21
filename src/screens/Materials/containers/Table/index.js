import { connect } from 'react-redux';
import React from 'react';
import TableWithLoader from '../../../../../components/TableWithLoader';
import { Dropdown, Menu, Icon } from 'antd';
import { getMaterial, triggerDrawer } from '../../CRUD/containers/screen/actions';
import { store } from '../../../../../store';

const menu = (props) => (
    <Menu>
        <Menu.Item key="0">
            <a onClick={() => { store.dispatch(getMaterial(props.materialId)); store.dispatch(triggerDrawer({ visible: true, action: 'Update', title: 'Edit Material' })); }}>Edit</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <a onClick={() => { store.dispatch(getMaterial(props.materialId)); store.dispatch(triggerDrawer({ visible: true, action: 'Delete', title: 'Delete Material' })); }}>Delete</a>
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
            <a onClick={() => { store.dispatch(getMaterial(record.id)); store.dispatch(triggerDrawer({ visible: true, action: 'Read', title: 'View Material' })); }}>
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
        render: materialId => (
            <Dropdown overlay={menu({ materialId })} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    Actions<Icon type="down" />
                </a>
            </Dropdown>
        ),
        fixed: 'right',
        width:200
    }];

const mapStateToProps = (state) => ({
    loading: state.Materials.loading,
    columns: columns,
    scroll: { x: 800}
});

export default connect(mapStateToProps, null)(TableWithLoader);
