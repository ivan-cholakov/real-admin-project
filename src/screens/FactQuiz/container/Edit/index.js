import { connect } from 'react-redux';
import FactQuiz from '../../index';
import {
    updateQuiz,
    getQuiz
} from '../../../../store/common/factQuizes/actions';
import { fetchCategories } from '../../../Categories/actions';
import { client } from '../../../../core/client';
import { triggerNotification } from '../../../../components/common/Notification/actions';

const { validator } = client;

const mapStateToProps = state => ({
    categories: state.Categories.categories,
    factQuiz: state.FactQuiz.factQuiz,
    editing: true
});

const mapDispatchToProps = dispatch => ({
    getQuiz: id => dispatch(getQuiz(id)).then(res => dispatch(fetchCategories())),
    onFormSubmit: factQuiz => {
        const validation = validator.factQuiz.update(factQuiz);
        if (validation.valid) {
            dispatch(updateQuiz(factQuiz)).then(res => {
                if (res.action.payload.error) {
                    dispatch(
                        triggerNotification({
                            msg: 'Fact Quiz was successfully updated!',
                            duration: 2,
                            type: 'success'
                        })
                    );
                }
            });
        } else {
            dispatch(
                triggerNotification({
                    msg: 'Fact Quiz was successfully updated!',
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
