import 'mapbox-gl/dist/mapbox-gl.css';
import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { ReactComponent as MapMarker } from '../../../assets/icons/common/map-marker.svg';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoiYW50b25ib3poaW5vdiIsImEiOiJjam1xMnhmMXIxZm95M3BrNHQwamFhNGZmIn0.jXNRCCWQq2QJMr15BHq09g';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
    }
  state = {
      viewport: {
          width: 400,
          height: 300,
          latitude: 37.7577,
          longitude: -122.4376,
          zoom: 14
      }
  };

  mapRef = React.createRef();

  componentDidMount() {
      window.addEventListener('resize', this.resize);
      if (this.props.address) {
          this.getLocation(this.props.address);
      }
      this.resize();
  }

  getLocation(address) {
      fetch(
          'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        address +
        '.json?access_token=' +
        MAPBOX_TOKEN
      )
          .then(res => res.json())
          .then(result => {
              if (result.features[0]) {
                  this.setState({
                      ...this.state,
                      viewport: {
                          ...this.state.viewport,
                          latitude: result.features[0].center[1],
                          longitude: result.features[0].center[0]
                      },
                      isLoaded: true
                  });
              }
          });
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
  }

  resize() {
      const width = this.containerRef.current.parentNode.clientWidth;
      const height = this.containerRef.current.parentNode.clientHeight;
      this.setState({
          viewport: {
              ...this.state.viewport,
              width: width || window.innerWidth,
              height: height || window.innerHeight
          }
      });
  }

  handleViewportChange = viewport => {
      this.setState({
          viewport: { ...this.state.viewport, ...viewport }
      });
  };

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  handleGeocoderViewportChange = viewport => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return this.handleViewportChange({
          ...viewport,
          ...geocoderDefaultOverrides
      });
  };

  render() {
      return (
          <div ref={this.containerRef}>
              <MapGL
                  ref={this.mapRef}
                  {...this.state.viewport}
                  onViewportChange={this.handleViewportChange}
                  mapboxApiAccessToken={MAPBOX_TOKEN}
              >
                  <Marker
                      latitude={this.state.viewport.latitude}
                      longitude={this.state.viewport.longitude}
                      offsetLeft={-20}
                      offsetTop={-10}
                  >
                      <MapMarker />
                  </Marker>
              </MapGL>
          </div>
      );
  }
}

export default MapComponent;
