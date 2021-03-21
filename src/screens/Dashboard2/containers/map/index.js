import { connect } from 'react-redux';
import {FlyToInterpolator} from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import Map from '../../../../components/sections/Dashboard/Map';
import { getHeatmapData, setHeatmapField } from '../screen/actions';

const API_KEY = 'pk.eyJ1IjoiYW50b25ib3poaW5vdiIsImEiOiJjam1xMnhmMXIxZm95M3BrNHQwamFhNGZmIn0.jXNRCCWQq2QJMr15BHq09g';

const mstp = (state) => {
    return {
        filters: state.Dashboard.filters,
        heatmap: state.Dashboard.heatmap,
        bounds: state.Dashboard.heatmap.bounds,
        viewport: state.Dashboard.heatmap.viewport,
        searchValue: state.Dashboard.heatmap.searchValue,
        clusters: state.Dashboard.heatmap.data
            .filter(p => p.properties.point_count),
        actions: state.Dashboard.heatmap.data
            .filter(p => !p.properties.point_count)
            .map(a => ({
                ...a.properties,
                location: {
                    lat: Number.parseFloat(a.properties.location.lat),
                    lng: Number.parseFloat(a.properties.location.lng)
                }
            })),
    }
}

const mdtp = (dispatch) => {
    return {
        onBoundsChange: (bounds, productId, options) => {
            dispatch(getHeatmapData(bounds.zoom, bounds.coordinates, productId, options))
            dispatch(setHeatmapField('bounds', bounds));
        },
        onSearchChange: (value) => {
            dispatch(setHeatmapField('searchValue', value))
        },
        search: async (value) => {
            if (value) {
                const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${API_KEY}`);
                const { features: [result]} = await res.json();
                const  { geometry: { coordinates: [ lng, lat]}} = result;
                const viewport = {
                    longitude: lng,
                    latitude: lat,
                    zoom: 14,
                    transitionDuration: 5000,
                    transitionInterpolator: new FlyToInterpolator(),
                    transitionEasing: easeCubic
                };
                dispatch(setHeatmapField('viewport', viewport))
            } else {
                const viewport = {
                    latitude: 40,
                    longitude: 0,
                    zoom: 1.2,
                    bearing: 0,
                    pitch: 10,
                }
                dispatch(setHeatmapField('viewport', viewport))
            }
        }
    }
}

const mp = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
    }
}

export default connect(
    mstp,
    mdtp,
    mp,
)(Map)