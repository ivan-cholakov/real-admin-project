import { connect } from 'react-redux';
import Account from '../';
import { updateCompany } from '../../../../../components/entityActions/Companies/CreateCompanyScreen/containers/Create/actions';
import { updateCompanyPhoto, getCompany } from '../../../../../store/common/companies/actions';
import { client } from '../../../../../core/client';
import { setValidationErrors, resetValidationErrors } from '../../../../../store/common/validation/actions';
import { triggerNotification } from '../../../../common/Notification/actions';


const mapStateToProps = (state) => ({
    company: state.CompaniesPage.companyData,
    validationErrors: state.Validation.validationErrors
});

const mapDispatchToProps = (dispatch) => ({
    onSubmit: async (params) => {
        const data = {
            id: params.id,
            displayName: params.displayName,
            description: params.description,
            vatNumber: params.vatNumber,
            regNumber: params.regNumber,
            ownerId: params.ownerId,
            industry: '',
            contact: {
                email: params.email,
                phone: {
                    prefix: params.phone.prefix,
                    number: params.phone.number
                },
            },
            address: {
                street: params.street,
                city: params.city,
                country: params.country,
                zipCode: params.zipCode
            }

        }
        
        if (params.image) {
            data.image = params.image;
        }

        if (params.logo && params.logo.size > 0)  {
            const photo = new FormData()
            photo.append('image', params.logo);
            const imageRes = await dispatch(updateCompanyPhoto(photo))
            if (!imageRes.action.payload.error){
                data.image = imageRes.action.payload.identifier;
            }
        }
    
        const validation = client.validator.company.update(data);
        if (validation.valid) {
            const res = await dispatch(updateCompany(data))
            if (res.action.payload.error) {
                return dispatch(triggerNotification({
                    type: 'error',
                    msg: 'There was an error updating the company information, please try again later',
                    duration: 3
                }))
            }
           
            dispatch(triggerNotification({
                type: 'success',
                msg: 'Company information updated successfully!',
                duration: 3
            }))
            dispatch(getCompany(params.id))
        } else {
            dispatch(setValidationErrors(validation.errors));
            return false;
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Account);

