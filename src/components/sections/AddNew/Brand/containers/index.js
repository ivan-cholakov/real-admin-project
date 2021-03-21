import { connect } from 'react-redux';
import NewBrand from '../index';
import { createBrand } from '../../../../../screens/Brands/containers/Create/actions';
import {
    updateBrandGallery,
    updateBrandImage,
    getCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate
} from '../../../../../screens/Brands/containers/screen/actions';
import { fetchCategories } from '../../../../../screens/Categories/actions';
import { triggerNotification } from '../../../../common/Notification/actions';
import { getCertificates as getCertificatesTypes } from '../../../../../store/common/certificates/actions';
import { push } from 'connected-react-router';
import {
    resetValidationErrors,
    setValidationErrors
} from '../../../../../store/common/validation/actions';
import { client } from '../../../../../core/client';

const mapDispatchToProps = (dispatch, ownProps) => ({
    getCertificatesTypes: () => {
        dispatch(getCertificatesTypes());
    },
    getCertificates: brandId => dispatch(getCertificates(brandId)),
    createCertificate: (brandId, certificates) =>
        dispatch(createCertificate(brandId, certificates)),
    updateCertificate: (brandId, certificates) =>
        dispatch(updateCertificate(brandId, certificates)),
    deleteCertificate: (brandId, certificates) =>
        dispatch(deleteCertificate(brandId, certificates)),
    fetchCategories: () => dispatch(fetchCategories()),
    onSubmit: async (formData, certificates) => {
        const {
            brandLogo,
            coverImage,
            photoGallery,
            mainImage,
            brandName,
            description,
            content,
            email,
            facebook,
            linkedin,
            medium,
            phoneNumber: { number, prefix },
            categoryId,
            snapchat,
            twitter,
            video,
            webPage,
            youtube,
            featured,
            rewardPercentage,
            returnDays
            // certificates
        } = formData;

        const logo = new FormData();
        logo.append('image', brandLogo);

        const image = new FormData();
        image.append('image', mainImage);

        const cover = new FormData();
        cover.append('image', coverImage);

        const gallery = new FormData();
        photoGallery.map((p, i) => {
            const file = new File([p.originFileObj], 'file' + i, { type: p.type });
            gallery.append('images', file);
        });

        const params = {
            displayName: brandName,
            description,
            video: video || {},
            // certificates: certificates || [],
            categoryId,
            content,
            gallery: [],
            featured,
            rewardPercentage,
            returnDays,
            externalLinks: {
                facebook,
                twitter,
                linkedin,
                youtube,
                snapchat,
                medium
            },
            contact: {
                phone: { prefix, number },
                email,
                webpage: webPage
            }
        };

        if (photoGallery.length) {
            const galleryResponse = await dispatch(updateBrandGallery(gallery));
            if (galleryResponse.value.length) {
                galleryResponse.value.forEach(file => {
                    params.gallery.push(file.identifier);
                });
            }
        }
        if (coverImage) {
            const coverRes = await dispatch(updateBrandImage(cover));
            if (!coverRes.action.payload.error) {
                params.cover = coverRes.action.payload.identifier;
            }
        }
        if (mainImage) {
            const imageRes = await dispatch(updateBrandImage(image));
            if (!imageRes.action.payload.error) {
                params.image = imageRes.action.payload.identifier;
            }
        }
        if (brandLogo) {
            const logoRes = await dispatch(updateBrandImage(logo));
            if (!logoRes.action.payload.error) {
                params.logo = logoRes.action.payload.identifier;
            }
        }
        const validation = client.validator.brand.create(params);
        if (validation.valid) {
            const {
                action: {
                    payload: { id }
                }
            } = await dispatch(createBrand(params));
            const certs = certificates.map(cert => ({
                type: cert.type,
                description: cert.note,
                file: cert.hyperlink || cert.attachment,
                startDate: cert.startDate,
                endDate: cert.validUntil,
                ownerId: id,
                ownerType: 'BRAND'
            }));
            await dispatch(createCertificate(id, certs));
            // if (error) {
            //     return dispatch(triggerNotification({
            //         type: 'error',
            //         msg: 'Error creating Brand, please try again later.',
            //         duration: '10',
            //     }))
            // }
            params.id = id;
            await fetch('https://instagram.com/accounts/logout');
            const r = new RegExp('prevPage=');
            const goTo =
        ownProps.location.search && r.test(ownProps.location.search)
            ? ownProps.location.search.split('=')[1]
            : '/';
            dispatch(
                triggerNotification({
                    msg: 'Brand was successfully created!',
                    duration: 10,
                    type: 'success'
                })
            );
            dispatch(push(goTo));
            return true;
        } else {
            dispatch(setValidationErrors(validation.errors));
            return false;
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    }
});

export default connect(
    state => ({
        certificates: state.BrandsPage.certificates || [],
        certificateTypes: state.Certificates.data || [],
        categories: state.Categories.categories || [],
    }),
    mapDispatchToProps
)(NewBrand);
