import { connect } from 'react-redux';
import React from 'react';
import TableWithLoader from '../../../../components/pageWidgets/TableWithLoader';
import { Dropdown, Menu, Icon } from 'antd';
import { getCompany } from '../screen/actions';
import { store } from '../../../../store';
import {openDrawer} from '../../../../components/common/drawer/container/actions';



const menu = (props) => (
    <Menu>
        <Menu.Item key="0">
            <span onClick={() => { 
                store.dispatch(getCompany(props.companyId));
                store.dispatch(openDrawer({ visible: true, action: 'Update', title: 'Edit Company' })); 
            }}>Edit</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <span onClick={() => { 
                store.dispatch(getCompany(props.companyId));
                store.dispatch(openDrawer({ visible: true, action: 'Delete', title: 'Delete Company' })); 
            }}>Delete</span>
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
            <span onClick={() => { 
                store.dispatch(getCompany(record.id)); 
                store.dispatch(openDrawer({ visible: true, action: 'Read', title: 'View Company' })); 
            }}>
                {record.name}
            </span>
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
        render: companyId => (
            <Dropdown overlay={menu({ companyId })} trigger={['click']}>
                <span className="ant-dropdown-link" href="#">
                    Actions<Icon type="down" />
                </span>
            </Dropdown>
        ),
        fixed: 'right',
        width:200
    }];

const mapStateToProps = (state) => ({
    loading: state.Companies.loading,
    columns: columns,
    scroll: { x: 800}
});

export default connect(mapStateToProps, null)(TableWithLoader);