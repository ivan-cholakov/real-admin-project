import { connect } from 'react-redux';
import NewsList from '../index';
import {
    getNews,
    deleteAPieceOfNews
} from '../../../store/common/news/actions';
import { triggerNotification } from '../../../components/common/Notification/actions';

const mapStateToProps = state => ({
    news: state.NewsPage.newsData
});

const mapDispatchToProps = dispatch => ({
    async getNews() {
        dispatch(getNews());
    },
    deleteAPieceOfNews: id => {
        dispatch(deleteAPieceOfNews(id)).then(res => {
            dispatch(getNews());
        });
        dispatch(
            triggerNotification({
                msg: 'News successfully deleted',
                duration: 2,
                type: 'success'
            })
        );
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsList);
