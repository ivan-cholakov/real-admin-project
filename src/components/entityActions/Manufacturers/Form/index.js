import React, { Component } from 'react';
import styles from './style.module.css';
import {Input} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
class manufacturerForm extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.manufacturerNameInput = React.createRef();
        this.manufacturerDescriptionInput = React.createRef();
        this.manufacturerBrandInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
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
        const manufacturer = {
            displayName: this.manufacturerNameInput.current.input.value,
            description: this.manufacturerDescriptionInput.current.textAreaRef.value,
            brandId: this.manufacturerBrandInput.value,
        };
        this.props.onFormSubmit(manufacturer);
    }
    

    render() {
        return (
            <div className={styles.formWrapper} ref={this.container}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <Input ref={this.manufacturerNameInput} defaultValue={this.props.manufacturerData.name} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>

                <div className={styles.fieldLabel}>
                    Description
                </div>
                <TextArea ref={this.manufacturerDescriptionInput} placeholder={this.props.manufacturerData.description} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.description}
                </div>

                <div className={styles.fieldLabel}>
                    Brand
                </div>
                <select  ref={(input) => this.manufacturerBrandInput = input}>
                    {this.props.brandsList.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}
                </select>
                <div className={styles.warningField}>
                    {this.props.validationErrors.description}
                </div>
                
                <div onClick={this.handleSubmit} className={styles.submitBtn}>Submit</div>
            </div>
        )
    }
}



export default manufacturerForm
