import React, { Component } from 'react';
import querystring from 'querystring';
import styles from './style.module.css';
import PreviewWebsite from '../../PreviewWebsite';
import FormsSection from '../../FormsSection';
import { connect } from 'react-redux';

class EcomFile extends Component {
    constructor(props) {
        super(props);
        const websites = this.props.websites || [];
        this.state = { landing: true, ecomFile: '', websites, loading: false};
        this.mapContainer = React.createRef();
        this.hideLanding = this.hideLanding.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleWebsitesChange = this.handleWebsitesChange.bind(this);
        this.type = querystring.decode(this.props.location.search.substr(1))['type'];
        this.fetchEcoms();
    }

    fetchEcoms = () => {
        this.id = this.props.id ? this.props.id : this.props.match.params.id;
        switch (this.type) {
        case 'product':
            this.props.getProductEcoms(this.id);
            break;
        case 'brand':
            this.props.getBrandEcoms(this.id);
            break;
        }
    }

    componentDidUpdate() {
    }

    handleWebsitesChange(websites) {
        this.setState({websites});
    }
    hideLanding() {
        this.setState({ landing: false, fieldValue: 'FACT-LIME-Stokist-1.1-DD-MM-YY' });
    }
    handleFileChange = (val) => {
        this.setState({ ecomFile: val });
    }
    handleFieldChange(fieldValue) {
        this.setState({ fieldValue });
    }
    handleSave() {
        this.props.createEcom()
    }
    handleAddEcom = (ecom) => {
        this.setState({loading: true});
        switch (this.type){
        case 'product':
            this.props.createProductEcom({ ...ecom, ownerId: this.id, companyId: this.props.companyId }, this.id).then(() => {this.handleEcomAdded()});
            break;
        case 'brand':
            this.props.createBrandEcom({ ...ecom, ownerId: this.id, companyId: this.props.companyId }, this.id).then(() => {this.handleEcomAdded()});
            break;
        }
    }
    handleEcomAdded = () => {
        this.setState({loading: false});
        switch (this.type) {
        case 'product':
            this.props.getProductEcoms(this.id);
            break;
        case 'brand':
            this.props.getBrandEcoms(this.id);
            break;
        }
    }
    render() {
        return (
            <div className={styles.innerContent}>
                <div className={styles.titleContainer}>
                    <h1>eCOM</h1>
                </div>
                <FormsSection backgroundStyle={'grey'}>
                    <div className={styles.contentContainer}>
                        <div className={[styles.description].join(' ')}>
                            Paste the web pages selling your product
                        </div>
                        <PreviewWebsite
                            onAdd={(ecom) => {this.handleAddEcom(ecom)}}
                            websites={this.props.websites}
                            handleWebsitesChange={this.handleWebsitesChange}
                            loading={this.state.loading}
                            token={this.props.token}
                            onDelete={(id) => {
                                this.props.deleteEcom(id).then(() => this.fetchEcoms())
                            }
                            }
                            onUpdate={(ecom) => {
                                this.props.updateEcom(ecom).then(() => this.fetchEcoms())
                            }
                            }
                        />
                    </div>
                </FormsSection>

            </div>
        );

    }
}

const mapStateToProps = (state) => ({
    token: state.User.userProfile.session.id
});

export default connect(mapStateToProps, null)(EcomFile);
