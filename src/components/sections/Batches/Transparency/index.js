import React, { Component } from 'react';
import styles from './style.module.css';
import FormsSection from '../../../pageWidgets/FormsSection';
import SectionTitle from '../../../pageWidgets/SectionTitle';
import CustomDropdown from '../../../pageWidgets/Dropdown';
import IconButton from '../../../pageWidgets/Buttons/Icon';
import { plus } from '../../../../assets/icons/sideNavigation/addAssets/icons';

class Transparency extends Component {
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
    onTrailChange = (val) => {
        this.props.onFieldChange('trailId', val);
    }

    handleAddClick = () => {
        this.props.openDrawer({ title: 'Create a trail', action: 'create', type: 'trail' });
    }

    render() {
        const trailsData = this.props.trailsData;
        return (
            <FormsSection>
                <SectionTitle title={'Transparency'}/>
                <div className={styles.sectionContentWrapper}>
                    <div className={styles.innerContent}>
                        <div className={styles.inputContainer}>
                            <CustomDropdown
                                grayColor={false}
                                placeholder={'Select'}
                                value={this.props.formData.trailId}
                                label={'Trail File'}
                                disabled={this.props.disabled}
                                onChange={this.onTrailChange}
                                items={this.formatData(trailsData)}
                            />
                        </div>
                        <div className={styles.btnContainer}>
                            <IconButton icon={plus} title={'new'} onClick={this.handleAddClick} />
                        </div>
                    </div>
                </div>
            </FormsSection>
        );
    }
}

export default Transparency
