import { connect } from 'react-redux';

import { client } from '../../../../core/client';
import {
    getNews,
    createAPieceOfNews,
    setNewsPhoto,
    updateNewsPhoto,
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
    aPieceOfNewsData: {},
    editing: false,
    categories: state.Categories.categories,
    validationErrors: state.Validation.validationErrors,
    types: types
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(fetchCategories()),
    updateNewsPhoto: async blob => {
        const formData = new FormData();
        formData.append('image', blob);
        try {
            const res = await dispatch(updateNewsPhoto(formData));
            return res;
        } catch (e) {
            console.log(e);
        }
    },
    onFormSubmit: (news, newsPhoto) => news => {
        const validation = validator.news.create(news);
        if (validation.valid) {
            dispatch(createAPieceOfNews(news)).then(response => {
                if (!response.action.payload.error) {
                    if (newsPhoto) {
                        const id = response.action.payload;
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
