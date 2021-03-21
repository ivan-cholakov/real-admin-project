import { Table, Input, Form } from 'antd';
import React, { Component } from 'react';
import styles from './style.module.css';
import CustomDropdown from '../Dropdown';
import { Config } from '../../../core/config';
import {activityColumns} from './TableColumns/columns';

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
            editing: props.dataIndex ? (props.isLast && !props.record[props.dataIndex]) : false,
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

class ActivityTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            rolesData: []
        };
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

    render() {
        this.columns = activityColumns;

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
                    className={styles.tableUser}
                    loading={this.props.loading}
                    dataSource={this.props.dataSource}
                    pagination={false}
                    bordered={false}
                    columns={columns}

                />
            </div>
        );
    }
}

export default ActivityTable
