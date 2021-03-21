import React, { Component } from 'react';
import { Upload } from 'antd';
import styles from './style.module.css';
import FormsSection from '../../FormsSection';
import SectionTitle from '../../SectionTitle';
import Heatmap from '../../../../components/pageWidgets/Heatmap';
import SmallBlueOutline from '../../Buttons/SmallBlueOutline';


class Stockists extends Component {
    static defaultProps = {
        product: {},
        brand: {},
        save: () => {},
    }
    
    constructor(props) {
        super(props);
        this.mapContainer = React.createRef();
        this.onUploadClick = this.onUploadClick.bind(this);
        this.type = this.props.location.pathname.split('/')[2];
    }

    async onUploadClick(file){
        switch (this.type){
        case 'brands':
            this.props.brandSave(this.props.brand.id, file);
            break;
        case 'products':
            this.props.productSave(this.props.product.id, file);
            break;
        }
    }
    render() {
        return (
            <div className={styles.stockistWrapper} style={{ height: '300' }}>
                <div className={styles.headingContainer}>
                    <SectionTitle title={'New Stockist File'} />
                </div>
                <div className={styles.innerContent}>
                    <FormsSection backgroundStyle={'grey'}>
                        <div className={styles.contentContainer}>
                            <div className={[styles.description, styles.noMarginTop].join(' ')}>
                                Please add the locations where your product can be found
                            </div>
                            {/* <div className={styles.fileRow}>
                                <div className={styles.rightPart}>
                                    <div className={styles.downloadBtn}>
                                        <DownloadButton title={'download template'} />
                                    </div>
                                </div>
                            </div> */}
                            <div className={styles.map}>
                                <Heatmap actions={this.props.stockist.data}/>
                            </div>
                            <div className={styles.csvButton}>
                                <div className={styles.btn}>
                                    <Upload
                                        name='file'
                                        showUploadList={false}
                                        multiple={false}
                                        beforeUpload={(file) => {
                                            this.onUploadClick(file);
                                            return false;
                                        }}
                                    >
                                        <SmallBlueOutline title={'Upload CSV'} />
                                    </Upload>
                                </div>
                            </div>
                        </div>

                    </FormsSection>
                </div>

            </div>
        );

    }
}

export default Stockists
