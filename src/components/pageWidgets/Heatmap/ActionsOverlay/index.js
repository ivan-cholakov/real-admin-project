import React from 'react';
import shortid from 'shortid'
import { SVGOverlay, BaseControl } from 'react-map-gl';

export default class ActionsOverlay extends BaseControl {
    static defaultProps = {
        color: '#12caaf',
        actions: [],
    }
    constructor(props) {
        super(props);
        this.redraw = this.redraw.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(action) {
        return  () => {
            this.props.onDotClick(action);
        }
    }
    redraw(actions, color) {
        return ({ project }) => (
            <g style={{
                width: 20,
                height: 20
            }}>
                {actions.map((action) => {
                    const key = shortid.generate();
                    const { lat, lng } = action.location;
                    if (lat >= -90 && lat <= 90) {
                        const [cx, cy] = project([lng, lat]);
                        return (
                            <g
                                key={key}
                            >
                                <circle
                                    id={key}
                                    cx={cx}
                                    cy={cy}
                                    r={4}
                                    fill={color}
                                    onClick={this.handleClick(action)}
                                />
                            </g>
                        )
                    }
                })}
            </g>
        );
    }
        

    render() {
        
        return (
            <SVGOverlay captureClick redraw={this.redraw(this.props.actions, this.props.color)} />
        )
    }

}