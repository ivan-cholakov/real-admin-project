import React, { Component } from 'react';
import styles from './style.module.css';
import EditableTableCellsEcoms from '../../../pageWidgets/EditableCellsTableEcoms';

class EcomForm extends Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    state = {
        ecom: {}
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
        this.props.onFormSubmit(this.state.ecom);
    }

    onFieldChange = (value, name) => {
        this.setState( Object.assign( this.state.ecom, {[name]: value}));
    };
    

    render() {
        return (
            <div className={styles.formWrapper} ref={this.container}>

                <EditableTableCellsEcoms blocksData={[]} firstInput={[]} secondInput={[]} onTableChange={(value) => { this.onFieldChange(value, 'ecoms')}}/>

                
                <div onClick={this.handleSubmit} className={styles.submitBtn}>Submit</div>
            </div>
        )
    }
}



export default EcomForm
