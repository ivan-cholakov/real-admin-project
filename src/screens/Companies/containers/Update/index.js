import { connect } from 'react-redux';
import { client } from '../../../../core/client';
import { updateCompanyPhoto } from '../screen/actions';
import { triggerNotification } from '../../../../components/common/Notification/actions';
import { resetValidationErrors, setValidationErrors } from '../../../../store/common/validation/actions';
import UpdateCompany from '../../../../components/entityActions/Companies/Update';
import { updateCompany } from './actions';
import { getCompanies } from '../../../../store/common/companies/actions';
import {closeDrawer} from '../../../../components/common/drawer/container/actions';

const { validator } = client;

const mapStateToProps = (state) => ({
    companiesData: state.CompaniesPage.companyData,
    selectedCompany: state.Companies.selectedCompany,
    userProfile: state.User.userProfile,
    validationErrors: state.Validation.validationErrors
}); 
const mapDispatchToProps = (dispatch) => ({
    onFormSubmit: (user, company, id)  => {
        const validation = validator.company.update(company);
        if(validation.valid){
            company.ownerId = user.id;
            company.id = id;
            dispatch(updateCompany(company)).then((response) => {
                if(!response.action.payload.error) {
                    dispatch(closeDrawer());
                    dispatch(getCompanies());
                    dispatch(triggerNotification({msg: 'Company was successfully updated!', duration: 2, type: 'success'}));
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
    updateCompanyPhoto: (blob) => {
        let formData = new FormData();
        formData.set('image', blob)
        const res = dispatch(updateCompanyPhoto(formData)).then((response) => {
            if(!response.action.payload.error) {
                return response;
            }
        })
        return res;
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(UpdateCompany);
