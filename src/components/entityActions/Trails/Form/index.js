import React, { Component } from 'react';
import styles from './style.module.css';
import {Input} from 'antd';
import EditableTable from '../../../pageWidgets/EditableCellsTable';
class trailForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.container = React.createRef();
    }

    state = {
        trail: {},
    };

    componentDidMount() {
        this.props.resetValidationErrors();
        this.container.current.addEventListener('keypress', this.handleKeyPress);
    }
    componentWillUnmount() {
        this.container.current.removeEventListener('keypress', this.handleKeyPress);
    }
    handleKeyPress(e) {
        const key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            this.handleSubmit();
        }
    }
    handleSubmit() {
        this.props.onFormSubmit(this.state.trail);
    }

    onFieldChange = (value, name) => {
        this.setState( Object.assign( this.state.trail, {[name]: value}));
    };

    formatTrailData(data){
        if(!data){
            data = []
        }
        return data.map( (trail) => {
            return {
                material: this.props.materialsData.filter(material => material.value === trail.materialId).map( (material) => ({
                    value: material.value,
                    label: material.label
                })),
                manufacturer: this.props.manufacturersData.filter(manufacturer => manufacturer.value === trail.manufacturerId).map( (manufacturer) => ({
                    value: manufacturer.value,
                    label: manufacturer.label,
                    description: trail.description
                })),
            }
        });
    }
    

    render() {
        const { TextArea } = Input;
        let trailData = this.props.trailData;
        if(!trailData.trail) {
            trailData.trail = []
        }

        return (
            <div className={styles.formWrapper} ref={this.container}>
                <div className={styles.fancyInput}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <Input onChange={(value) => { this.onFieldChange(value.target.value, 'name')}} defaultValue={trailData.trail.name} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>
                </div>

                <div className={styles.fieldLabel}>
                    Description
                </div>
                <TextArea onChangeCapture={(value) => { this.onFieldChange(value.target.value, 'description')}} rows={3} defaultValue={trailData.trail.description} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.description}
                </div>
                <div className={styles.warningField}>
                    {this.props.validationErrors.description}
                </div>

                <EditableTable onTableChange={(value) => { this.onFieldChange(value, 'blocks')}} blocksData={this.formatTrailData(trailData.blocks)} firstInput={this.props.materialsData} secondInput={this.props.manufacturersData}/>

                
                <div onClick={this.handleSubmit} className={styles.submitBtn}>Submit</div>
            </div>
        )
    }
}



export default trailForm
