import { connect } from 'react-redux';
import { getAPieceOfNews } from '../../../../store/common/news/actions';
import News from '../../index';

const mapStateToProps = state => {
    return {
        aPieceOfNews: state.News.aPieceOfNewsData
    };
};
const mapDispatchToProps = dispatch => ({
    getAPieceOfNews: async id => {
        dispatch(getAPieceOfNews(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(News);
