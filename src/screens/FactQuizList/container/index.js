import { connect } from 'react-redux';

import FactQuizList from '../index';

import {
    fetchQuizes,
    deleteQuiz
} from '../../../store/common/factQuizes/actions';

const mapStateToProps = state => ({
    factQuizes: state.FactQuizes.factQuizes,
    loading: state.FactQuizes.loading
});

const mapDispatchToProps = dispatch => ({
    fetchQuizes: () => dispatch(fetchQuizes()),
    deleteQuiz: id =>
        dispatch(deleteQuiz(id)).then(res => dispatch(fetchQuizes()))
    // onFormSubmit: () => {}
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
    // ...stateProps,
    // ...dispatchProps,
    // onFormSubmit: dispatchProps.onFormSubmit(
    //     stateProps.user,
    //     stateProps.companyPhoto
    // )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
    // mergeProps
)(FactQuizList);
