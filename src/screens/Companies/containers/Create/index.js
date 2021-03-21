import { connect } from 'react-redux';
import { createCompany } from './actions';
import CreateCompany from '../../../../components/entityActions/Companies/Create';
import { client } from '../../../../core/client';
import { setCompanyPhoto, updateCompanyPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import { closeDrawer, openDrawer } from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    companyData: {contact: {}},
    companyPhoto: state.CompaniesPage.companyPhoto,
    user: state.User.userProfile,
    validationErrors: state.Validation.validationErrors,
});
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, companyPhoto) => (company) => {
        const validation = validator.company.create(company);
        if(validation.valid){
            company.ownerId = user.id;
            dispatch(createCompany(company)).then((response) => {
                dispatch(closeDrawer());
                if(!response.action.payload.error) {
                    if(companyPhoto){
                        const id = response.action.payload.id;
                        let formData = new FormData();
                        formData.set('image', companyPhoto);
                        dispatch(updateCompanyPhoto(id, formData)).then((res) => {
                            if(!res.action.payload.error) {
                                dispatch(triggerNotification({msg: 'Company was successfully created!', duration: 2, type: 'success'}));
                                /* Commented due to component rerender
                                TODO this needs to be fixed
                                 */
                                //    dispatch(getCompanies());
                            }
                        })
                    }
                    else {
                        /* Commented due to component rerender
                                TODO this needs to be fixed
                                 */
                        //   dispatch(getCompanies());
                        dispatch(triggerNotification({msg: 'Company was successfully created!', duration: 2, type: 'success'}));
                    }

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
        dispatch(setCompanyPhoto(val));
    },
    openDrawer: (drawerData) => {
        dispatch(openDrawer(drawerData))
    },
    closeDrawer: () => {
        dispatch(closeDrawer())
    }
});

const mergeProps = (stateProps, dispatchProps) => {
    return {
        ...stateProps,
        ...dispatchProps,
        onFormSubmit: dispatchProps.onFormSubmit(stateProps.user, stateProps.companyPhoto)

    }
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(CreateCompany);
