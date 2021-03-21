import React, { Component } from 'react';
import shortid from 'shortid';
import _ from 'lodash';
import styles from './style.module.css';
import TextInput from '../../../TextInput';
import SectionDivider from '../../../SectionDivider';
import leafIcon from '../../../../../assets/icons/common/leaf.svg';
import packIcon from '../../../../../assets/icons/common/packaging.svg';
import manIcon from '../../../../../assets/icons/common/manufacturer.svg';
import ProductInfoRow from '../../../ProductInfoRow';
import StatusComponent from '../../../StatusComponent';
import ContentsForm from '../../../ContentsForm';
import ManufacturerForm from '../../../ManufacturerForm';
import PackagingForm from '../../../PackagingForm';
import SquareButton from '../../../Buttons/Square';
import BlueButton from '../../../Buttons/Blue';
import SmallBlueOutline from '../../../Buttons/SmallBlueOutline';

const initialState = {
    formData: {
        contents: [],
        packaging: [],
        manufacturer: []
    },
    submittedContents: [],
    submittedPackaging: [],
    submittedManufacturers: [],
    modalVisibility: false,
    contentForm: {
        visible: true,
        editing: false,
        content: {},
        buttonVisibility: false
    },
    packagingForm: {
        visible: true,
        editing: false,
        content: {},
        buttonVisibility: false
    },
    manufacturerForm: {
        visible: true,
        editing: false,
        content: {},
        buttonVisibility: false
    },
    deleteModal: {
        entityId: '',
        modalTitle: 'Delete',
        visible: false
    }

}

class AddTrail extends Component {
    constructor(props) {
        super(props);
        this.updateDebounced = _.debounce(this.update, 100);
        const { contents, packaging, manufacturers, displayName } = props.trail;
        const initialStateCopy = { ...initialState }
        initialStateCopy.fileName = displayName;
        initialStateCopy.formData.contents = contents || [];
        initialStateCopy.contentForm.visible = initialStateCopy.formData.contents.length?false:true;
        initialStateCopy.formData.packaging = packaging || [];
        initialStateCopy.packagingForm.visible = initialStateCopy.formData.packaging.length?false:true;
        initialStateCopy.formData.manufacturer = manufacturers || [];
        initialStateCopy.manufacturerForm.visible = initialStateCopy.formData.manufacturer.length?false:true;
        this.state = initialStateCopy;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.trail.id !== this.props.trail.id) {
            const { contents, packaging, manufacturer, displayName } = this.props.trail;
            this.setState({
                ...this.state,
                fileName: displayName,
                formData: {
                    contents: contents || [],
                    packaging: packaging || [],
                    manufacturer: manufacturer || [],
                }
            })
        }
        if (this.props.shouldResetTrail) {
            this.setState(initialState)
            this.props.onTrailReset()
        }
    }

    handleVisibleChange = (visible) => {
        this.setState({ modalVisibility: visible });
    };

    update = async (newState) => {
        await this.props.updateTrail(newState);
    }

    onFileNameChange = async (value) => {
        const newState = {
            ...this.state,
            fileName: value,
        }
        this.updateDebounced(newState)
        this.setState(newState);

    }

    onFieldChange = (value, name) => {
        this.setState(Object.assign(this.state.formData.contents, { [name]: value }));
    };

    onContentsSubmit = async (value) => {
        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                contents: [...this.state.formData.contents, value]
            },
            contentForm: {
                visible: false,
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    onContentsEditSubmit = async (value) => {
        const { index } = this.state.contentForm.content;
        let contents;
        if (index !== undefined) {
            contents = this.state.formData.contents;
            delete value.index;
            contents[index] = value;
        }

        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                contents
            },
            contentForm: {
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    onPackagingSubmit = async (value) => {
        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                packaging: [...this.state.formData.packaging, value]
            },
            packagingForm: {
                visible: false,
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    onPackagingEditSubmit = async (value) => {
        const { index } = this.state.packagingForm.content;
        let packaging;
        if (index !== undefined) {
            packaging = this.state.formData.packaging;
            delete value.index;
            packaging[index] = value;
        }

        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                packaging
            },
            packagingForm: {
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };


    onManufacturerSubmit = async (value) => {
        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                manufacturer: [...this.state.formData.manufacturer, value]
            },
            manufacturerForm: {
                visible: false,
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    onManufacturerEditSubmit = async (value) => {
        const { index } = this.state.manufacturerForm.content;
        let manufacturer;
        if (index !== undefined) {
            manufacturer = this.state.formData.manufacturer;
            delete value.index;
            manufacturer[index] = value;
        }

        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                manufacturer
            },
            manufacturerForm: {
                buttonVisibility: true
            }
        }
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    contentsNewEntry = () => {
        this.setState({
            contentForm: {
                visible: true,
                buttonVisibility: false
            }
        });
    };

    packagingNewEntry = () => {
        this.setState({
            packagingForm: {
                visible: true,
                buttonVisibility: false
            }
        });
    };

    manufacturerNewEntry = () => {
        this.setState({
            manufacturerForm: {
                visible: true,
                buttonVisibility: false
            }
        });
    };


    contentsRowEdit = (index) => {
        const contents = this.state.formData.contents[index];
        contents.editing = true;
        this.setState({
            ...this.state,
            contentForm: {
                ...this.state.contentForm,
                content: {
                    index,
                    ...contents
                },
                editing: true,
                visible: false,
                buttonVisibility: false
            }
        });
    };

    packagingRowEdit = (index) => {
        const packaging = this.state.formData.packaging[index];
        packaging.editing = true;
        this.setState({
            ...this.state,
            packagingForm: {
                ...this.state.packagingForm,
                content: {
                    index,
                    ...packaging
                },
                editing: true,
                visible: false,
                buttonVisibility: false
            }
        });
    };

    manufacturerRowEdit = (index) => {
        const manufacturer = this.state.formData.manufacturer[index];
        manufacturer.editing = true;
        this.setState({
            ...this.state,
            manufacturerForm: {
                ...this.state.manufacturerForm,
                content: {
                    index,
                    ...manufacturer
                },
                editing: true,
                visible: false,
                buttonVisibility: false
            }
        });
    };

    contentsRowDelete = async (index) => {
        const contentsArray = [...this.state.formData.contents];
        if (index > -1) {
            contentsArray.splice(index, 1);
        }
        this.handleDeleteModalChange();

        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                contents: contentsArray
            },
            contentForm: {
                visible: false,
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    packagingRowDelete = async (index) => {
        const packagingArray = [...this.state.formData.packaging];
        if (index > -1) {
            packagingArray.splice(index, 1);
        }
        this.handleDeleteModalChange();

        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                packaging: packagingArray
            },
            packagingForm: {
                visible: false,
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    manufacturerRowDelete = async (index) => {
        const manufacturerArray = [...this.state.formData.manufacturer];
        if (index > -1) {
            manufacturerArray.splice(index, 1);
        }
        this.handleDeleteModalChange();

        const newState = {
            ...this.state,
            formData: {
                ...this.state.formData,
                manufacturer: manufacturerArray
            },
            manufacturerForm: {
                visible: false,
                buttonVisibility: true
            }
        };
        const valid = await this.props.updateTrail(newState);
        if (valid) {
            this.setState(newState)
        }
    };

    handleDeleteModalChange = (visible) => {
        this.setState({
            ...this.state,
            deleteModal: {
                ...this.state.deleteModal,
                visible
            }
        });

    }


    render() {
        return (
            <>
            <div className={styles.contentContainer}>
                <div className={styles.contentWrapper}>
                    <p className={styles.greyHeading}>Please enter as much information as possible</p>
                    <div className={styles.inputWrapper}>
                        <TextInput
                            style={{ color: '#15caaf', textAlign: 'center' }}
                            border={'solid 1px rgba(172,172,172,0.2)'}
                            disabled={this.props.disabled}
                            onChange={this.onFileNameChange}
                            value={this.state.fileName}
                            label="File Name"
                        />
                    </div>

                    <SectionDivider icon={leafIcon} title={'CONTENTS'} />

                    {this.state.formData.contents.map((contents, i) => (
                        <ProductInfoRow
                            key={shortid.generate()}
                            formComponent={ContentsForm}
                            editing={contents.editing}
                            formData={contents}
                            visible={this.state.deleteModal.visible}
                            deleteModal={this.state.deleteModal}
                            modalVisibility={this.state.modalVisibility}
                            handleDeleteModalChange={() => this.handleDeleteModalChange}
                            onEditSubmit={(formData) => this.onContentsEditSubmit(formData)}
                            deleteItem={() => this.contentsRowDelete(i)}
                            onEdit={() => this.contentsRowEdit(i)}
                            firstColumn={contents.rawMaterial}
                            secondColumn={contents.name}
                            thirdColumn={contents.email}
                            fourthColumn={contents.contactName}
                            fifthColumn={<StatusComponent active={false} />}
                            mapButton={SquareButton}
                            handleVisibleChange={() => this.handleVisibleChange()}
                        />
                    ))}
                    {this.state.contentForm.visible ?
                        <ContentsForm
                            formData={this.state.formData}
                            onFieldChange={this.onFieldChange}
                            visible={true}
                            onSubmit={this.onContentsSubmit}
                        /> : ''}
                    <div className={styles.btnContainer}>
                        <SmallBlueOutline
                            hidden={this.state.contentForm.visible}
                            icon={'plus'}
                            title={'NEW ENTRY'}
                            onClick={this.contentsNewEntry} />
                    </div>

                    <SectionDivider icon={packIcon} title={'PACKAGING'} />

                    {this.state.formData.packaging.map((packaging, i) => (
                        <ProductInfoRow
                            key={shortid.generate()}
                            formComponent={PackagingForm}
                            editing={packaging.editing}
                            formData={packaging}
                            visible={this.state.deleteModal.visible}
                            deleteModal={this.state.deleteModal}
                            modalVisibility={this.state.modalVisibility}
                            handleDeleteModalChange={() => this.handleDeleteModalChange}
                            onEditSubmit={(formData) => this.onPackagingEditSubmit(formData)}
                            onEdit={() => this.packagingRowEdit(i)}
                            deleteItem={() => this.packagingRowDelete(i)}
                            firstColumn={packaging.rawMaterial}
                            secondColumn={packaging.name}
                            thirdColumn={packaging.email}
                            fourthColumn={packaging.contactName}
                            fifthColumn={<StatusComponent active={false} />}
                            mapButton={SquareButton}
                            handleVisibleChange={() => this.handleVisibleChange()}
                        />
                    ))}
                    {this.state.packagingForm.visible ?
                        <PackagingForm
                            formData={this.state.formData}
                            onFieldChange={this.onFieldChange}
                            visible={true}
                            onSubmit={this.onPackagingSubmit}
                        /> : ''}
                    <div className={styles.btnContainer}>
                        <SmallBlueOutline
                            hidden={this.state.packagingForm.visible}
                            icon={'plus'}
                            title={'NEW ENTRY'}
                            onClick={this.packagingNewEntry} />
                    </div>
                    <SectionDivider icon={manIcon} title={'MANUFACTURER'} />

                    {this.state.formData.manufacturer.map((manufacturer, i) => (
                        <ProductInfoRow
                            key={shortid.generate()}
                            formComponent={ManufacturerForm}
                            editing={manufacturer.editing}
                            deleteModal={this.state.deleteModal}
                            handleDeleteModalChange={() => this.handleDeleteModalChange}
                            modalVisibility={this.state.modalVisibility}
                            formData={manufacturer}
                            visible={this.state.deleteModal.visible}
                            onEditSubmit={(formData) => this.onManufacturerEditSubmit(formData)}
                            onEdit={() => this.manufacturerRowEdit(i)}
                            deleteItem={() => this.manufacturerRowDelete(i)}
                            firstColumn={manufacturer.companyName}
                            secondColumn={manufacturer.processType}
                            thirdColumn={manufacturer.contactName}
                            fourthColumn={manufacturer.email}
                            fifthColumn={<StatusComponent active={false} />}
                            mapButton={SquareButton}
                            handleVisibleChange={() => this.handleVisibleChange()}
                        />
                    ))}
                    {this.state.manufacturerForm.visible ?
                        <ManufacturerForm
                            formData={this.state.formData}
                            onFieldChange={this.onFieldChange}
                            visible={true}
                            onSubmit={this.onManufacturerSubmit}
                        /> : ''}
                    <div className={styles.btnContainer}>
                        <SmallBlueOutline
                            hidden={this.state.manufacturerForm.visible}
                            icon={'plus'}
                            title={'NEW ENTRY'}
                            onClick={this.manufacturerNewEntry} />
                    </div>
                </div>
            </div>

            <div className={styles.btn}>
                <BlueButton title={'Next'} onClick={this.props.handleTrailSubmit} />
            </div>
            </>
        )
    }
}

export default AddTrail
