import { connect } from 'react-redux';
import NewBrand from '../index';
import { withRouter } from 'react-router-dom';
import { updateBrand } from '../../../../../screens/Brands/containers/Create/actions';
import {
    updateBrandGallery,
    updateBrandImage,
    getBrand,
    deleteBrand,
    getCertificates,
    createCertificate,
    updateCertificate,
    deleteCertificate
} from '../../../../../screens/Brands/containers/screen/actions';
import { fetchCategories } from '../../../../../screens/Categories/actions';
import { triggerNotification } from '../../../../common/Notification/actions';
import { push } from 'connected-react-router';
import { getCertificates as getCertificatesTypes } from '../../../../../store/common/certificates/actions';
import {
    resetValidationErrors,
    setValidationErrors
} from '../../../../../store/common/validation/actions';
import { client } from '../../../../../core/client';
import { Config } from '../../../../../core/config';

const config = new Config();

const mstp = state => {
    return {
        brand: state.BrandsPage.brandData || {},
        edit: true,
        certificateTypes: state.Certificates.data || {},
        certificates: state.BrandsPage.certificates || [],
        categories: state.Categories.categories || [],
    };
};

const mapDispatchToProps = dispatch => ({
    getCertificatesTypes: () => {
        dispatch(getCertificatesTypes());
    },
    getCertificates: brandId => {
        return dispatch(getCertificates(brandId));
    },
    createCertificate: (brandId, certificates) =>
        dispatch(createCertificate(brandId, certificates)),
    updateCertificate: (brandId, certificates) =>
        dispatch(updateCertificate(brandId, certificates)),
    deleteCertificate: (brandId, certificates) =>
        dispatch(deleteCertificate(brandId, certificates)),
    fetchCategories: () => dispatch(fetchCategories()),
    getBrand: async id => {
        const baseUrl = config.getBaseUrl();
        const token = client.auth.getSessionToken();
        const {
            action: { payload: brand }
        } = await dispatch(getBrand(id));
        if (brand.logo) {
            const res = await fetch(
                `${baseUrl}/storage${
                    brand.logo
                }?token=${token}&width=433&height=98&quality=80`
            );
            brand.logo = await res.blob();
        }
        if (brand.cover) {
            const coverRes = await fetch(
                `${baseUrl}/storage${
                    brand.cover
                }?token=${token}&width=475&height=200&quality=80`
            );
            brand.cover = await coverRes.blob();
        }
        if (brand.image) {
            const imageRes = await fetch(
                `${baseUrl}/storage${
                    brand.image
                }?token=${token}&width=200&height=200&quality=80`
            );
            brand.image = await imageRes.blob();
        }
        if (brand.gallery.length) {
            const promises = brand.gallery.map(async url => {
                const res = await fetch(
                    `${baseUrl}/storage${url}?token=${token}&width=400&height=400&quality=80`
                );
                return res.blob();
            });
            brand.gallery = await Promise.all(promises);
        }
        return brand;
    },
    onSubmit: async (formData, certificates) => {
        const {
            brandId,
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
            featured,
            youtube,
            feed,
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
            id: brandId,
            displayName: brandName,
            description,
            video: video || {},
            categoryId,
            content,
            featured,
            feed,
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
            },
            gallery: []
        };
        const certs = certificates.map(cert => ({
            type: cert.type,
            description: cert.note,
            file: cert.hyperlink || cert.attachment,
            startDate: cert.startDate,
            endDate: cert.validUntil,
            ownerId: brandId,
            ownerType: 'BRAND'
        }));
        await dispatch(createCertificate(brandId, certs));
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
        const validation = client.validator.brand.update(params);
        if (validation.valid) {
            await dispatch(updateBrand(params));
            await fetch('https://instagram.com/accounts/logout');

            dispatch(
                triggerNotification({
                    msg: 'Brand was successfully updated!',
                    duration: 10,
                    type: 'success'
                })
            );
            dispatch(push('/assets/brands'));
            return true;
        } else {
            dispatch(setValidationErrors(validation.errors));
            return false;
        }
    },
    resetValidationErrors: () => {
        dispatch(resetValidationErrors());
    },
    deleteBrand: id => {
        dispatch(deleteBrand(id)).then(res => {
            if (!res.action.payload.error) {
                dispatch(
                    triggerNotification({
                        type: 'success',
                        msg: 'Brand was successfully deleted.',
                        duration: 5
                    })
                );
                dispatch(push('/assets/brands'));
            }
        });
    }
});

export default connect(
    mstp,
    mapDispatchToProps
)(withRouter(NewBrand));
