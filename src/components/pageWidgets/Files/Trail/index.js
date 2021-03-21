import React, { Component } from 'react';
import styles from './style.module.css';
import Overview from './Overview';
import AddTrail from './container/addTrail';

class TrailFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentView: 0,
            addTrailVisible: false,
            shouldResetTrail: false,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.product.id !== this.props.product.id) {
            this.props.loadTrails(this.props.product)
        }
    }

    addTrail = async () => {
        const valid = await this.props.onAddTrail();
        if (valid) {
            this.setState({
                addTrailVisible: true,
                shouldResetTrail: true,
            })
        }
    }

    editTrail = () => {
        this.setState({
            addTrailVisible: true,
        })
    }
    selectTrail = async (trailId) => {
        await this.props.onSelectTrail(trailId);
    }

    trailResseted = () => {
        this.setState({
            ...this.state,
            shouldResetTrail: false,
        })
    }
    render() {
        return (
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.innerContent}>
                        <div className={styles.titleContainer}>
                            <h1>NEW TRAIL FILE</h1>
                        </div>
                        {this.state.addTrailVisible &&
                            <AddTrail
                                handleTrailSubmit={this.props.handleTrailSubmit}
                                shouldResetTrail={this.state.shouldResetTrail}
                                onTrailReset={this.trailResseted}
                            />
                        }

                        {/* {this.state.addTrailVisible === false && */}
                        <Overview
                            addTrail={this.addTrail}
                            trails={this.props.trails}
                            editTrail={this.editTrail}
                            selectTrail={this.selectTrail}
                        />
                        {/* } */}
                    </div>
                </div>
            </div>
        );
    }
}

export default TrailFile;

