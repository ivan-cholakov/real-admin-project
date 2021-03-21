import React, { Component } from 'react';
import styles from './style.module.css';
import { Loader } from '../../common/Loader';

class ImagesGrid extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
        this.preloadImages = this.preloadImages.bind(this);
    }
    componentDidMount() {
        this.preloadImages(this.props.images);
    }
    componentDidUpdate(prevProps) {
        if(JSON.stringify(prevProps.images) !== JSON.stringify(this.props.images)) {
            this.preloadImages(this.props.images);
        }
    }

    preloadImages(images) {
        if (this.props.preload === true) {
            this.setState({ loading: true });
            this.imagesData = images;
            const preloadImagesArr = [];
            for (let i = 0; i < images.length; i++) {
                const img = new Image();
                img.src = images[i].url;
                preloadImagesArr.push(img);
                img.onload = () => {
                    const notLoaded = preloadImagesArr.find((x) => {
                        return x.complete === false;
                    })
                    if (!notLoaded) {
                        this.setState({ loading: false });
                    }
                }
            }
        }
        else {
            this.setState({loading: false});
        }

    }
    gridImage(props) {
        return (
            <div className={styles.imgContainer} style={{ background: `url(${props.img.url})` }}>
            </div>
        )
    }
    render() {
        const images = this.props.images.map((x) => {
            return <this.gridImage key={x.index} img={x} />
        })
        return (

            <div className={styles.feedContainer}>
                {this.state.loading &&
                    <div className={styles.loaderContainer}>
                        <Loader />
                    </div>
                }
                {!this.state.loading &&
                    <div className={styles.imagesContainer}>
                        {images}
                    </div>
                }
            </div>
        )
    }
}

export default ImagesGrid;
