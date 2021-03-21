import React, { Component } from 'react';
// import Slider from 'react-slick';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

class CardCarousel extends Component {
    render() {
        return (
            <AliceCarousel {...this.props.settings}>
            </AliceCarousel>
        )
    }
}

export default CardCarousel
