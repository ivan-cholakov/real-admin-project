import React,{Component} from 'react';
import TextInput from '../TextInput';
import styles from './style.module.css';
import SmallBlueOutlineButton from '../Buttons/SmallBlueOutline';

class ManufacturerForm extends Component{

    state = {
        companyName: this.props.formData ? this.props.formData.companyName : '',
        processType: this.props.formData ? this.props.formData.processType : '',
        email: this.props.formData ? this.props.formData.email : '',
        contactName: this.props.formData ? this.props.formData.contactName : '',
        address: this.props.formData ? this.props.formData.address : '',
        id: this.props.formData ? this.props.formData.id : '',
    };

    onChange = (value, label) => {
        this.setState({[label]: value});
    };

    clearState = () => {
        this.setState({
            companyName: '',
            processType: '',
            email: '',
            contactName: '',
            address: '',
        })
    }

    handleSave = () => {
        this.props.onSubmit(this.state);
        this.clearState();
    };



    render() {
        let formData = this.state;
        if(!formData){
            formData = {}
        }
        return(
            <div hidden={!this.props.visible} className={styles.formWrapper}>
                <div className={styles.columnsContainer}>
                    <div className={styles.column}>
                        <TextInput
                            label={'Company Name'}
                            placeholder={'Enter'}
                            value={formData.companyName}
                            onChange={(value) => this.onChange(value, 'companyName')}
                        />
                    </div>
                    <div className={styles.column}>
                        <TextInput
                            label={'Process Type'}
                            placeholder={'Enter'}
                            value={formData.processType}
                            onChange={(value) => this.onChange(value, 'processType')}
                        />
                    </div>
                </div>

                <div className={styles.columnsContainer}>
                    <div className={styles.column}>
                        <TextInput
                            label={'Supplier Email'}
                            placeholder={'Enter'}
                            value={formData.email}
                            onChange={(value) => this.onChange(value, 'email')}
                        />
                    </div>
                    <div className={styles.column}>
                        <TextInput
                            label={'Supplier Contact Name'}
                            placeholder={'e.g. Tom Proctor'}
                            value={formData.contactName}
                            onChange={(value) => this.onChange(value, 'contactName')}
                        />
                    </div>
                </div>

                <div className={styles.columnsContainer}>
                    <TextInput
                        onChange={(value) => this.onChange(value, 'address')}
                        placeholder={'e.g. 242 Primrose Hill'}
                        value={formData.address}
                        label="Address"/>
                </div>

                <div className={styles.btn}>
                    <SmallBlueOutlineButton icon={'plus'} title={'SAVE'} onClick={this.handleSave}/>
                </div>
            </div>
        )
    }
}

export default ManufacturerForm
