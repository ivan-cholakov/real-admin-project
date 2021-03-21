import React, { Component } from 'react';
import SmallRedButton from '../../Buttons/SmallRedButton';

class DeleteBatch extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel() {
        this.handleVisibleChange(false);
    }
    handleSubmit() {
        this.props.deleteBatch(this.state.inputValue);
    }
    render() {
        return (
            <div>
                <SmallRedButton onClick={this.handleSubmit()} title={'DELETE'} />
            </div>
        );
    }
}

export default DeleteBatch;
