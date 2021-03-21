import React,{Component} from 'react';
import _ from 'lodash';
import styles from './style.module.css';
import Heatmap from '../../../pageWidgets/Heatmap';
import TextInput from '../../../pageWidgets/TextInput';
import { client } from '../../../../core/client';

class Map extends Component{
    static defaultProps = {
        bounds: {},
        filters: {},
        clusters: [],
        actions: [],
        searchValue: '',
        viewport: {
            latitude: 40,
            longitude: 0,
            zoom: 1.2,
            bearing: 0,
            pitch: 10,
        },
        search: () => {},
        onSearchChange: () => {},
    }

    constructor(props){
        super(props);
        this.search = _.debounce(props.search, 1500);
    }

    componentDidUpdate(prevProps) {
        const same = _.isEqual(prevProps.filters, this.props.filters);
        if(!same) {
            const { from, to } = this.props.filters;
            let { productId } = this.props.filters;

            const options = new client.QueryOptions({
                filter: { type: 'range', start: from.valueOf(), end: to.valueOf(), field: 'createdAt' }
            })
            if (productId === 'all') {
                productId = null;
            }    
            this.props.onBoundsChange(this.props.bounds, productId, options);
        }
    }

    handleSearch = (value) => {
        this.props.onSearchChange(value);
        this.search(value);
    }

    handleBoundsChange = (bounds) => {
        const { from, to } = this.props.filters;
        let { productId } = this.props.filters;

        const options = new client.QueryOptions({
            filter: { type: 'range', start: from.valueOf(), end: to.valueOf(), field: 'createdAt' }
        })
        if (productId === 'all') {
            productId = null;
        }
        this.props.onBoundsChange(bounds, productId, options);
    }

    render() {
        return (
            <div className={styles.totalScansWrapper}>
                <div className={styles.title}>
                    Location
                </div>
                <div className={styles.mapContainer}>
                    <Heatmap
                        viewport={this.props.viewport}
                        actions={this.props.actions}
                        clusters={this.props.clusters}
                        onBoundsChange={this.handleBoundsChange}
                        onViewPortChange={this.props.onViewportChange}
                    />
                </div>
                <div className={styles.searchField}>
                    <div className={styles.inputContainer}>
                        <TextInput
                            type={'text'} 
                            placeholder={'Search Location'}
                            value={this.props.searchValue} 
                            onChange={this.handleSearch}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Map
