import React from 'react';
import styles from './style.module.css';
import { Steps } from 'antd';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

const WizardStep = ({steps, currentStep, goToStep}) => {

    const renderStep = (step, index) => {
        const isPassedStep = currentStep>index;
        const classes = classNames({
            [styles.step]: true,
            [styles['current-step']]: currentStep===index,
            [styles['passed-step']]: isPassedStep,
        });
        return <Steps.Step
            key={step.title}
            className={classes}
            title={step.title}
            icon={
                <div onClick={isPassedStep?goToStep.bind(null,step.path):null}>
                    <img src={step.icon} alt="" />
                </div>
            } 
        />;
    }; 

    return (
        <div className={styles.stepsWrapper}>
            <Steps labelPlacement="vertical" size="default" current={0}>
                {steps.map(renderStep)}
            </Steps>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    goToStep: path => {
        dispatch(push(path));
    },
});

export default connect(null, mapDispatchToProps)(WizardStep);