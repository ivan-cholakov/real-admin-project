import { connect } from 'react-redux';
import CreateCompany from '../../../Form';
import { client } from '../../../../../../core/client';
import { createCompany } from './actions';
import { triggerNotification } from '../../../../../common/Notification/actions';
import { setValidationErrors, resetValidationErrors } from '../../../../../../store/common/validation/actions';
import { updateCompanyPhoto } from './actions';

const { validator } = client;
let companyPhoto = '';

const mapStateToProps = (state) => ({
    companyData: {contact: {}},
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch, ownProps) => ({
    onFormSubmit: (user) => (company) => {
        if(companyPhoto){
            let formData = new FormData();
            formData.set('image', companyPhoto);
            const imageRes = dispatch(updateCompanyPhoto(formData));
            company.image = imageRes.action.payload.identifier;
        }
        const validation = validator.company.create(company);
        if(validation.valid){
            company.ownerId = user.id;
            dispatch(createCompany(company)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(triggerNotification({msg: 'Company was successfully created!', duration: 2, type: 'success'}));
                    ownProps.history.push('/');
                }
            })
        }
        else {
            dispatch(setValidationErrors(validation.errors));
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    },
    setCompanyPhoto: (val) => {
        companyPhoto = val;
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateCompany);
