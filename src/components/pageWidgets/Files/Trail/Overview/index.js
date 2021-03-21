import React, { Component } from 'react';
import styles from './style.module.css';
import CustomDropdown from '../../../Dropdown';
import SmallBlueOutline from '../../../Buttons/SmallBlueOutline';

class Overview extends Component {

    formatData(data) {
        if (!data) {
            data = []
        }
        return data.map((item) => {
            return {
                label: { text: item.displayName },
                value: item.id,
            }
        });
    }

    render() {
        return (
            <div className={styles.contentContainer}>
                <p className={styles.greyHeading}>Use this page to prove you’re transparent</p>
                <div className={styles.btnContainer, styles.butTrailCreate} style={{ background: 'white', borderRadius: '22px' }}>
                
                    <SmallBlueOutline
                        icon={'plus'}
                        title={'CREATE NEW TRAIL FILE'}
                        onClick={() => this.props.addTrail()}
                    />
                </div>
                <div className={styles.orSeparator}>OR</div>
                <div className={styles.editContainer, styles.existingFileInput}>
                    <CustomDropdown
                        label="Edit Existing File"
                        placeholder={'Select'}
                        items={this.formatData(this.props.trails)}
                        onChange={this.props.selectTrail}
                    />
                    <span className={styles.editButton} style={{ background: 'white', borderRadius: '22px', display: 'inline-table', marginTop: '30px' }}>
                        <SmallBlueOutline
                            title={'EDIT'}
                            onClick={this.props.editTrail}/>
                    </span>
                </div>
            </div>
        );
    }
}

export default Overview;

