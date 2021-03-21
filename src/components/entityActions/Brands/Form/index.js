import React, { Component } from 'react';
import styles from './style.module.css';
import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
class brandForm extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.brandNameInput = React.createRef();
        this.brandDescriptionInput = React.createRef();
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
        const brand = {
            displayName: this.brandNameInput.current.input.value,
            description: this.brandDescriptionInput.current.textAreaRef.value,
        };
        this.props.onFormSubmit(brand);
    }
    

    render() {
        return (
            <div className={styles.formWrapper} ref={this.container}>
                <div className={styles.fieldLabel}>
                    Name
                </div>
                <Input ref={this.brandNameInput} defaultValue={this.props.brandData.name} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.name}
                </div>

                <div className={styles.fieldLabel}>
                    Description
                </div>
                <TextArea ref={this.brandDescriptionInput} placeholder={this.props.brandData.description} />
                <div className={styles.warningField}>
                    {this.props.validationErrors.description}
                </div>
                
                <div onClick={this.handleSubmit} className={styles.submitBtn}>Submit</div>
            </div>
        )
    }
}



export default brandForm
