import React,{Component} from 'react';
import styles from './style.module.css';

class GradientCircle extends Component{
    state = {
        circleWidth: '',
        contentWidth: ''
    }

    componentDidMount() {
        this.calculateWidth(this.props.minWidth, this.props.maxWidth, this.props.minNumber, this.props.maxNumber, this.props.number)
    }

    calculateWidth = (minWidth, maxWidth, minNumber, maxNumber, number) => {
        let numberPercentage = ((number - minNumber) * 100 / (maxNumber - minNumber))
        let width = (numberPercentage * (maxWidth - minWidth) / 100 + minWidth);
        this.setState({circleWidth: width}, () => this.calculateContentWidth(this.state.circleWidth))
    }

    calculateContentWidth = (width) => {
        this.setState({contentWidth: width - 6})
    }

    render() {
        return <div className={styles.circleWrapper} style={{width: this.state.circleWidth, height: this.state.circleWidth}}>
            <div className={styles.contentWrapper} style={{width: this.state.contentWidth, height: this.state.contentWidth}}>
                {this.props.image &&
                    <span className={styles.image}><img src={this.props.image}/></span>
                }
                {this.props.icon &&
                    <span className={styles.icon}>{this.props.icon}</span>
                }
                <span className={styles.number}>{this.props.number}</span>
                <span className={styles.label}>{this.props.label}</span>
            </div>
        </div>
    }
}

export default GradientCircle
