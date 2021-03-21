import React from 'react';
import shortid from 'shortid';
import styles from './style.module.css';

class BatchList extends React.Component {
    static defaultProps = {    
        batches: [],
        getBatches: () => {}
    }
    componentDidMount() {
        this.props.getBatches();
    }

    handleBatchClick = (b) => () => {
        const { history } = this.props;
        history.push(`/batches/${b.id}`)
    }

    renderBatches = () => {
        const { batches } = this.props;
        return batches.map(b => (
            <div
                key={shortid.generate()}
                className={styles.batchCard}
                onClick={this.handleBatchClick(b)}
            >
                <div>
                    <h1 className={styles.batchName}>{b.name}</h1>
                </div>
                <div className={styles.batchDescription}>
                    <p>items: {b.itemsCount}</p>
                </div>
            </div>
        ))
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderBatches()}
            </div>
        )
    }
}

export default BatchList;