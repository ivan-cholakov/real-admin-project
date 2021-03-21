import React, { Component } from 'react';
import ModalComponent from '../../../common/modal';
import TextInput from '../../TextInput';
import ModalFooter from '../../../common/modal/Footer';
import SmallBlueOutlineButton from '../../Buttons/SmallBlueOutline';

class DuplicateBatch extends Component {
    constructor(props){
        super(props);
        this.state = {visible: false, inputValue: '#FACT-LIME-B14-12/02/19-copy1'};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }
    handleCancel() {
        this.handleVisibleChange(false);
    }
    handleSubmit() {
        
        this.handleVisibleChange(false);
        this.props.createBatch(this.state.inputValue);
    }
    handleVisibleChange(visible) {
        this.setState({visible})
    }
    handleChange(val) {
        this.setState({ inputValue: val });
    }
    triggerModal() {
        this.setState({visible: true});
    }
    render() {
        return (
            <div>

                <SmallBlueOutlineButton onClick={this.triggerModal} title={'DUPLICATE'}/>
                <ModalComponent visible={this.state.visible} handleVisibleChange={this.handleVisibleChange} title={'Duplicate Batch'}>
                    <TextInput value={this.state.inputValue} label={'Batch name'} grayColor={true} onChange={(value) => {this.handleChange(value)}} />
                    <ModalFooter cancelTitle={'CANCEL'} okTitle={'DUPLICATE'} onCancel={this.handleCancel} onSubmit={this.handleSubmit} />
                </ModalComponent>

            </div>
        )
    }
}

export default DuplicateBatch
