import React from 'react';
import { Marker } from 'react-map-gl';
import styles from './styles.module.css';


export default class ClusterTextOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.redrawNoAnimation = this.redrawNoAnimation.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(action) {
        return () => {
            this.props.onDotClick(action);
        }
    }

    redrawNoAnimation(clusters, color) {
        let currId;
        return clusters.map((cluster) => {
            let radius;
            currId = cluster.id;
            let z;
            if (cluster.properties) {
                const pointCount = cluster.properties.point_count;
                if (pointCount> 0 && pointCount <= 10) {
                    radius = 2 * (pointCount);
                    z=1;
                    if (radius < 15) {
                        radius = 15;
                    }
                    //10 => 7
                }
                else if (pointCount > 10 && pointCount <= 100) {
                    radius = 7 * (pointCount / 7.5);
                    z=2;
                    if (radius < 25) {
                        radius = 25;
                    }
                    if(radius>35){
                        radius = 30;
                    }
                    //100 => 11
                }
                else if (pointCount > 100 && pointCount <= 1000) {
                    radius = 11 * (pointCount / 125);
                    z=3;
                    if (radius < 30) {
                        radius = 35;
                    }
                    //1000 => 15
                }
                else if (pointCount > 1000 && pointCount <= 10000) {
                    radius = 15 * (pointCount / 1250);
                    z=4;
                    if (radius < 40) {
                        radius = 50;
                    }
                    //10000 => 19
                }
                else {
                    z=5;
                    if (radius < 60) {
                        radius = 60;
                    }
                    radius = 19 * (pointCount / 5000);
                }
            }
            return (
                    
                <Marker data-zIndex={5} key={currId}longitude={cluster.geometry.coordinates[0]} latitude={cluster.geometry.coordinates[1]}>
                    <div className={styles.pointCounterWrapper} style={{zIndex: z, width:radius*1.5, height:radius*1.5, backgroundColor: color}}>
                        <div className={styles.pointCounter}>{cluster.properties.point_count_abbreviated}</div>
                    </div>
                </Marker>
            )
            
        })}

    render() {
        return (
            this.redrawNoAnimation(this.props.clusters, this.props.color)
        )
    }

}
