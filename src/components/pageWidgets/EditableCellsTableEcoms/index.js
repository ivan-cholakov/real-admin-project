import {Table, Button, Popconfirm, Form} from 'antd';
import React, { Component } from 'react';
import deleteIcon from '../../../assets/icons/common/delete.png';
import styles from './style.module.css';
import TextInput from '../TextInput';
import TextArea from 'antd/es/input/TextArea';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {

    constructor(props){
        super(props);

        this.state = {
            editing: props.dataIndex?(props.isLast && !props.record[props.dataIndex]):false,
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

    getInput = (value, defaultValue, change, title) => {
        if (this.props.inputType === 'dropdown') {
            return <div>
                <label>{title}</label>
                <TextInput
                    value={value}
                    onChange={(value) => change(value)}
                    defaultValue={defaultValue}
                    dropdownWidthMatch={false}
                /></div>;
        }
        return <div>
            <label>{title}</label><TextArea value={value} /></div>;
    };

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            defaultValue,
            record,
            change,
            children
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
                                        })(
                                            this.getInput(record[dataIndex], defaultValue, change, title)
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

class EditableTableCellsEcoms extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: 'Name',
            dataIndex: 'name',
            editable: true,
            defaultValue: this.props.firstInput,
            render: (value) => {

                const found = this.props.firstInput.find(item => item.value === value);
                return found?found.label:''
            }
        }, {
            title: 'Description',
            dataIndex: 'description',
            editable: true,
            defaultValue: this.props.secondInput,
            render: (value) => {
                const found = this.props.secondInput.find(item => item.value === value);
                return found?found.label:''
            }
        },
        {
            title: 'Url',
            dataIndex: 'url',
            editable: true,
            render: (value) => {
                return value;
            }
        }, {
            title: '',
            dataIndex: 'operation',
            render: (text, record, index) => (
                index < this.state.count
                    ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <span><img className={styles.deleteIcon} src={deleteIcon} alt="" /></span>
                        </Popconfirm>
                    ) : null
            ),
        }];

        this.state = {
            dataSource: (this.props.blocksData.length > 0) ? this.props.blocksData.map((block, index) => {
                return {
                    key: index,
                    name: block.name,
                    description: block.description,
                    url: block.url

                };
            }) : [{
                key: 0,
                name: '',
                description: '',
                url: ''
            }],
            count: this.props.blocksData.length,
        };
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        this.setState({ count: this.state.count - 1 });
    }

    handleChange = (value) =>{
        const { record } = this.props;
        this.handleSave({ ...record, value });
    };

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count + 1,
            name: '',
            description: '',
            url: ''
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
        this.props.onTableChange(this.state.dataSource);
    };
    render() {

        let blocksData = this.props.blocksData;
        if (!blocksData) {
            blocksData = []
        }
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
                onCell: (record, index) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    inputType: col.dataIndex === 'description' ? 'text' : 'dropdown',
                    title: col.title,
                    defaultValue: col.defaultValue,
                    change: this.handleChange,
                    handleSave: this.handleSave,
                    isLast: this.state.dataSource.length-1 === index
                }),
            };
        });

        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'tableRow'}
                    dataSource={this.state.dataSource}
                    pagination={false}
                    bordered={false}
                    columns={columns}
                />
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    Add a row
                </Button>
            </div>
        );
    }
}

export default EditableTableCellsEcoms
