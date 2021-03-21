import React, { Component } from 'react';
import styles from './style.module.css';
import FormsSection from '../../../pageWidgets/FormsSection';
import SectionTitle from '../../../pageWidgets/SectionTitle';
import CustomDropdown from '../../../pageWidgets/Dropdown';
import CampaignSummary from '../../../pageWidgets/CampaignSummary';
import IconButton from '../../../pageWidgets/Buttons/Icon';
import { plus } from '../../../../assets/icons/sideNavigation/addAssets/icons';

class Marketing extends Component {
    formatData = (files) => {
        //format files from SDK to work with Dropdown.
        // empty now because IDK structure.
        return files
    }
    constructor(props){
        super(props);
        this.campaignFilesData = [
            {
                value: 'file1',
                label: {
                    text:'Campaign File1'
                }
            },
            {
                value: 'file2',
                label: {
                    text:'Campaign File2'
                }
            },
            {
                value: 'file3',
                label: {
                    text:'Campaign File3'
                }
            }
        ]
        this.campaignRules = [
            {
                text: '5 questions survey'
            },
            {
                text: 'Buy 3 in 2 months and get 110 ALMD'
            }
        ]
    }
    onMarketingFileChange = (file) => {
        this.props.onFieldChange('marketingFile', file);
    }
    handleAddClick = () => {
        this.props.openDrawer({ action: 'create', type: 'campaign', title: 'Add Campaign'});
    }

    render() {
        // for mock purposes.
        const files = this.props.campaignsData.length > 0 ? this.props.campaignsData : this.campaignFilesData;
        const selectedFile = files.find((x) => {
            return x.value === this.props.formData.marketingFile
        })
        let rules = [];
        if(selectedFile && selectedFile.rules) rules = selectedFile.rules;
        // for mock purposes.
        else rules = this.campaignRules;
        return (
            <FormsSection backgroundStyle="grey">
                <SectionTitle title={'MARKETING'} />
                <div className={styles.contentContainer}>
                    <div className={styles.dropdownContainer}>
                        <CustomDropdown 
                            label={'Campaign File'}
                            placeholder={'Select'} 
                            value={this.props.formData.marketingFile}
                            disabled={this.props.disabled} 
                            onChange={this.onMarketingFileChange} 
                            items={this.formatData(files)}
                        />   
                    </div>
                    <div className={styles.btnContainer}>
                        <IconButton icon={plus} title={'new'} onClick={this.handleAddClick}/>
                    </div>
                    <div className={styles.ruleContainer}>
                        <CampaignSummary rules={rules}/>
                    </div>
                </div>
            </FormsSection>
        );
    }
}

export default Marketing
