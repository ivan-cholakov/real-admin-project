import React, { Component } from 'react';
import SmallGreenButton from '../../Buttons/SmallGreen';

class SaveBatch extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleCancel() {
        this.handleVisibleChange(false);
    }
    handleSubmit() {
        this.props.submitBatch(this.state.inputValue)
    }
    render() {
        return (
            <div>
                <SmallGreenButton onClick={this.handleSubmit()} title={'SAVE'}/>

            </div>
        )
    }
}

export default SaveBatch
