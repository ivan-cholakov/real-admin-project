import React, { Component } from 'react';
import styles from './style.module.css';
import _ from 'lodash';
import MapGL, { NavigationControl } from 'react-map-gl';
import ActionsOverlay from './ActionsOverlay';
import ClusterOverlay from './ClusterOverlay';

const TOKEN =
  'pk.eyJ1IjoiYW50b25ib3poaW5vdiIsImEiOiJjam1xMnhmMXIxZm95M3BrNHQwamFhNGZmIn0.jXNRCCWQq2QJMr15BHq09g';

class Heatmap extends Component {
  static defaultProps = {
      onBoundsChange: () => {},
      onViewportChange: () => {},
      actions: [], // {location: {latitude: 60.51, longitude: 80.24}}
      clusters: [],
      viewport: {}
  };
  constructor(props) {
      super(props);

      this.state = {
          viewport: {
              bearing: 0,
              height: 0,
              latitude: 40,
              longitude: 0,
              pitch: 10,
              width: 0,
              zoom: 1.2
          }
      };
      this.containerRef = React.createRef();
      this.mapGLRef = React.createRef();
      this._resize = this._resize.bind(this);
      this._updateViewport = this._updateViewport.bind(this);
      this.stopChanging = this.stopChanging.bind(this);
      this.afterViewportUpdate = this.afterViewportUpdate.bind(this);
      this.restore = _.debounce(this.stopChanging, 500);
  }
  componentDidMount() {
      window.addEventListener('resize', this._resize);
      this._resize();
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this._resize);
  }

  componentDidUpdate(prevProps) {
      if (!_.isEqual(prevProps.viewport, this.props.viewport)) {
          this.setState({
              ...this.state,
              viewport: {
                  ...this.state.viewport,
                  ...this.props.viewport
              }
          });
      }
  }

  _resize() {
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
  _updateViewport(viewport) {
      this.restore();
      this.setState({ viewport, changing: true });
  }
  afterViewportUpdate() {
      const mapGL = this.mapGLRef.current.getMap();
      const coordinates = mapGL.getBounds();
      const bounds = {
          coordinates: [
              coordinates._sw.lng,
              coordinates._sw.lat,
              coordinates._ne.lng,
              coordinates._ne.lat
          ],
          zoom: this.state.viewport.zoom
      };
      this.props.onBoundsChange(bounds);
  }
  stopChanging() {
      this.afterViewportUpdate();
      this.setState({
          changing: false
      });
      this.props.onViewportChange(this.state.viewport);
  }

  render() {
      const { viewport } = this.state;
      return (
          <div className={styles.mapWrapper} ref={this.containerRef}>
              <MapGL
                  {...viewport}
                  mapStyle="mapbox://styles/mapbox/light-v9"
                  onViewportChange={this._updateViewport}
                  ref={this.mapGLRef}
                  mapboxApiAccessToken={TOKEN}
              >
                  <div style={{ position: 'absolute', right: 0 }}>
                      <NavigationControl />
                  </div>
                  {!this.state.changing && viewport.zoom && (
                      <ActionsOverlay
                          actions={this.props.actions}
                          color={'#12caaf'}
                          onDotClick={this.handleDotClick}
                      />
                  )}
                  {!this.state.changing && (
                      <ClusterOverlay
                          clusters={this.props.clusters}
                          color={'#12caaf'}
                          onDotClick={this.handleDotClick}
                      />
                  )}
              </MapGL>
          </div>
      );
  }
}

export default Heatmap;
