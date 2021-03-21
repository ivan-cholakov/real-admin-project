import { connect } from 'react-redux';
import BatchList from '../index';
import { getBatches } from '../../../store/common/batches/actions';

const mstp = (state) => {
    return {
        batches: state.Batches.batchesData
    }
}

const mdtp = (dispatch) => {
    return {
        async getBatches() {
            dispatch(getBatches())
        }
    }
}

export default connect(
    mstp,
    mdtp,
)(BatchList)
