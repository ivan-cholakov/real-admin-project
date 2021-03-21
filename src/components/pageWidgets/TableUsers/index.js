import { Table, Input, Form } from 'antd';
import React, { Component } from 'react';
import styles from './style.module.css';
import { store } from '../../../store';
import { getUser } from '../../../screens/Users/containers/screen/actions';
import { openDrawer } from '../../common/drawer/container/actions';
import mockImage from '../../../assets/img/avatar.svg';
import editImage from '../../../assets/icons/adminUsers/edit.svg';
import deleteImage from '../../../assets/icons/adminUsers/delete.svg';
import CustomDropdown from '../Dropdown';
import { client } from '../../../core/client';
import { Config } from '../../../core/config';
import StatusComponent from '../StatusComponent';
import ModalComponent from '../../common/modal';
import DeleteModal from '../DeleteModal';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();
const baseUrl = `${protocol}://${host}:${port}/storage`

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);


const EditableFormRow = Form.create()(EditableRow);


class EditableCell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editing: props.dataIndex ? (props.isLast && !props.record[props.dataIndex]) : false
        };
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing });
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {

                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    getInput = (value, options) => {
        if (this.props.inputType === 'dropdown') {
            return <CustomDropdown
                //value={value}
                onChange={(value) => value}
                items={options}
                className={'tableDropdown'}
                dropdownWidthMatch={false}
            />;
        }
        return <Input />;
    };

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            options,
            record,
            change,
            children,
        } = this.props;
        return (
            <td ref={node => (this.cell = node)}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                            setFieldsValue: record[dataIndex],

                                        })(
                                            this.getInput(record[dataIndex], options, change)
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 6 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : children}
            </td>
        );
    }
}

class TableUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            rolesData: [],
            modal: {
                visible: false,
                userId: '',
                modalTitle: 'Delete User'
            }
        };
    }



    handleChange = () => {

    };
    componentDidUpdate(prevProps) {
        if (prevProps.dataSource !== this.props.dataSource) {
            const dataSource = this.props.dataSource.map((data, index) => {
                return {
                    key: index,
                    id: data.id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.contact.email,
                    role: data.role.id,
                    active: data.active,
                    profileImage: data.profileImage

                };
            });
            this.setState(Object.assign(this.state, { dataSource: dataSource }));
        }
        if (prevProps.rolesData !== this.props.rolesData) {
            const roles = this.props.rolesData.map((data) => {
                return {
                    label: data.displayName,
                    value: data.id,

                };
            })
            this.setState(Object.assign(this.state, { rolesData: roles }));
        }
    }

    handleDelete = (id) => {
        this.handleVisibleChange('')
        this.props.deleteUser(id);
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => { return row.id === item.id });
        if (index !== -1) {
            const item = newData[index];
            newData.splice(index, 1, {
                ...item,
                ...row,
            });
            this.setState({ dataSource: newData });
        }

        //if(newData.length === this.state.dataSource.length){
        //    this.handleAdd();
        //}

        let user = {
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName,
            roleId: row.role,
            contact: {
                email: row.email
            },
        }

        this.props.onFormSubmit(user);
        // this.props.onTableChange(row);
    };

    handleVisibleChange(userId) {
        this.setState({...this.state,
            modal:{
                ...this.state.modal,
                visible: !this.state.modal.visible,
                userId
            }
        });

    }

    render() {
        this.columns = [{
            title: 'Avatar',
            dataIndex: 'avatar',
            sorter: true,
            key: 'avatar',
            width: 50,
            render: (value, record) => {
                return (
                    <span className={styles.userAvatar}>
                        {record.profileImage ?
                            <img src={
                                baseUrl +
                                record.profileImage +
                                '?token=' +
                                client.auth.getSessionToken()
                            } alt="" /> :
                            <img src={mockImage} alt="" />}
                    </span>
                );
            }
        }, {
            title: 'First Name',
            dataIndex: 'firstName',
            sorter: true,
            key: 'firstName',
            width: 90,
            render: (value, record) => {
                return (
                    <span
                        onClick={() => {
                            store.dispatch(getUser(record.id)).then(() => {
                                store.dispatch(openDrawer(
                                    { action: 'read', title: 'Read User', type: 'user', className: 'userDrawer' }
                                ))
                            });
                        }}>
                        {value}
                    </span>
                )
            }
        }, {
            title: 'Last Name',
            dataIndex: 'lastName',
            sorter: true,
            key: 'lastName',
            width: 90,
            render: (value, record) => {
                return (
                    <span
                        onClick={() => {
                            store.dispatch(getUser(record.id)).then(() => {
                                store.dispatch(openDrawer(
                                    { action: 'read', title: 'Read User', type: 'user', className: 'userDrawer' }
                                ))
                            });
                        }}>
                        {value}
                    </span>
                )
            }
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250
        }, {
            title: 'Role',
            key: 'role',
            width: 140,
            options: this.state.rolesData,
            dataIndex: 'role',
            render: (value, record) => {
                const found = this.state.rolesData.find(item => item.value === record.role);
                return found ? found.label : ''
            }
        }, {
            title: 'Status',
            key: 'status',
            dataIndex: ' status',
            width: 100,
            render: (value, record) => {
                return <StatusComponent active={record.active} />
            }
        }, {
            title: '',
            key: 'actions',
            dataIndex: 'id',
            render: (userId, record) => (
                <span className={styles.actions}>
                    <span onClick={(event) => {
                        event.stopPropagation();
                        store.dispatch(getUser(userId), this.props.getRoles())
                            .then(() => {
                                store.dispatch(
                                    openDrawer({
                                        action: 'update',
                                        title: 'Edit User',
                                        type: 'user',
                                        className: 'userDrawer'
                                    })
                                )
                            })
                    }
                    }>
                        <img src={editImage} alt="" />
                    </span>
                    <span onClick={() =>  this.handleVisibleChange(userId) }>
                        <img src={deleteImage} alt="" />
                    </span>
                </span>
            ),
            width: 70
        }];

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    inputType: col.dataIndex === 'role' ? 'dropdown' : 'text',
                    avatar: col.avatar,
                    title: col.title,
                    options: col.options,
                    change: this.handleChange,
                    handleSave: this.handleSave,
                    //  isLast: this.state.dataSource.length - 1 === index
                }),
            };
        });
        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    showHeader={false}
                    className={styles.tableUser}
                    loading={this.props.loading}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    bordered={false}
                    columns={columns}
                />
                <ModalComponent
                    destroyOnClose={true}
                    visible={this.state.modal.visible}
                    background={'grey'}
                    handleVisibleChange={this.handleVisibleChange}
                    title={this.state.modal.modalTitle}
                    footer={null}
                >
                    <DeleteModal
                        modalContent={'Are you sure you want to delete?'}
                        userId={this.state.modal.userId}
                        handleDelete={(userId) => this.handleDelete(userId)}
                        onModalCancel={() => this.handleVisibleChange('')}
                        okTitle={'Delete'}
                    />
                </ModalComponent>
            </div>
        );
    }
}

export default TableUsers
