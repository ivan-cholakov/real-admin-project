import { connect } from 'react-redux';

import FactQuiz from '../../index';
import { fetchCategories } from '../../../Categories/actions';
import { createQuiz } from '../../../../store/common/factQuizes/actions';
import { client } from '../../../../core/client';
import { triggerNotification } from '../../../../components/common/Notification/actions';

const { validator } = client;

const mapStateToProps = state => ({
    categories: state.Categories.categories
});

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(fetchCategories()),
    onFormSubmit: factQuiz => {
        const validation = validator.factQuiz.create(factQuiz);
        if (validation.valid) {
            dispatch(createQuiz(factQuiz)).then(res => {
                if (res.action.payload.error) {
                    dispatch(
                        triggerNotification({
                            msg: 'Fact Quiz was successfully created!',
                            duration: 2,
                            type: 'success'
                        })
                    );
                }
            });
        } else {
            dispatch(
                triggerNotification({
                    msg: 'Fact Quiz was successfully created!',
                    duration: 2,
                    type: 'success'
                })
            );
        }
    }
});

const mergeProps = (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FactQuiz);
