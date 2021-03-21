import { connect } from 'react-redux';

import { client } from '../../../../core/client';
import {
    getNews,
    setNewsPhoto,
    updateNewsPhoto,
    getAPieceOfNews,
    deleteAPieceOfNews,
    updateAPieceOfNews,
    resetState
} from '../../../../store/common/news/actions';

import {
    setValidationErrors,
    resetValidationErrors
} from '../../../../store/common/validation/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';

import NewsForm from '../../NewsForm';
import { fetchCategories } from '../../../Categories/actions';
import types from '../../data';

const { validator } = client;

const mapStateToProps = state => ({
    aPieceOfNewsData: state.News.aPieceOfNewsData,
    categories: state.Categories.categories,
    editing: true,
    validationErrors: state.Validation.validationErrors,
    types: types
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(fetchCategories()),
    getAPieceOfNews: id => {
        dispatch(getAPieceOfNews(id)).then(res => {
            dispatch(fetchCategories());
        });
    },
    deleteAPieceOfNews: id => {
        dispatch(deleteAPieceOfNews(id));
        dispatch(
            triggerNotification({
                msg: 'News successfully deleted',
                duration: 2,
                type: 'success'
            })
        );
    },
    updateNewsPhoto: async blob => {
        let formData = new FormData();
        formData.append('image', blob);

        try {
            const res = await dispatch(updateNewsPhoto(formData));
            return res;
        } catch (e) {
            console.log(e);
        }
    },
    onFormSubmit: (news, newsPhoto) => news => {
        const validation = validator.news.update(news);
        if (validation.valid) {
            dispatch(updateAPieceOfNews(news)).then(response => {
                if (!response.action.payload.error) {
                    if (newsPhoto) {
                        let formData = new FormData();
                        formData.append('image', newsPhoto);

                        dispatch(updateNewsPhoto(formData)).then(res => {
                            if (!res.action.payload.error) {
                                dispatch(
                                    triggerNotification({
                                        msg: 'News successfully created',
                                        duration: 2,
                                        type: 'success'
                                    })
                                );
                                dispatch(getNews());
                            } else {
                                dispatch(getNews());
                                dispatch(
                                    triggerNotification({
                                        msg: 'News successfully created',
                                        duration: 2,
                                        type: 'success'
                                    })
                                );
                            }
                        });
                    } else {
                        dispatch(setValidationErrors(validation.errors));
                    }
                }
            });
        }
    },
    resetState: () => dispatch(resetState()),
    resetValidationErrors: () => dispatch(resetValidationErrors()),
    setNewsPhoto: val => dispatch(setNewsPhoto(val))
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    onFormSubmit: dispatchProps.onFormSubmit(
        stateProps.user,
        stateProps.newsPhoto
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(NewsForm);
