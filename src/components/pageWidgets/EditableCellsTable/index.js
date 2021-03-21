import { Table, Button, Popconfirm, Form } from 'antd';
import React, { Component } from 'react';
import StyledDropdown from '../StyledDropdown';
import TextArea from 'antd/es/input/TextArea';
import deleteIcon from '../../../assets/icons/common/delete.png';
import styles from './style.module.css';

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

    getInput = (value, options, change) => {
        if (this.props.inputType === 'dropdown') {
            return <StyledDropdown
                value={value}
                onChange={(value) => change(value)}
                options={options}
                dropdownWidthMatch={false}
            />;
        }
        return <TextArea value={value} placeholder={'Description'} />;
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

class EditableTable extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: 'Material',
            dataIndex: 'materialId',
            editable: true,
            options: this.props.firstInput,
            render: (value) => {

                const found = this.props.firstInput.find(item => item.value === value);
                return found?found.label:''
            }
        }, {
            title: 'Manufacturer',
            dataIndex: 'manufacturerId',
            editable: true,
            options: this.props.secondInput,
            render: (value) => {
                const found = this.props.secondInput.find(item => item.value === value);
                return found?found.label:''
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
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
                            <span>
                                <img className={styles.deleteIcon} src={deleteIcon} alt="" />
                            </span>
                        </Popconfirm>
                    ) : null
            ),
        }];

        this.state = {
            dataSource: (this.props.blocksData.length > 0) ? this.props.blocksData.map((block, index) => {
                return {
                    key: index,
                    materialId: block.material[0].value,
                    manufacturerId: block.manufacturer[0].value,
                    description: block.manufacturer[0].description

                };
            }) : [{
                key: 0,
                materialId: '',
                manufacturerId: '',
                description: ''
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
            materialId: '',
            manufacturerId: '',
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
        this.props.onTableChange(this.state.dataSource);
        this.setState({ dataSource: newData });

        //if(newData.length === this.state.dataSource.length){
        //    this.handleAdd();
        //}
        
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
                    options: col.options,
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
                    rowClassName={() => 'editable-row'}
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

export default EditableTable
