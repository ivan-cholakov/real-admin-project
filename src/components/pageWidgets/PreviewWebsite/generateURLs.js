
import { Config } from '../../../core/config';

const config = new Config();

const protocol = config.getProtocol();
const host = config.getHost();
const port = config.getPort();

export const generatePreviewUrl = (url, token) => {
    const encoded = encodeURIComponent(url);
    const previewUrl = `${protocol}://${host}:${port}/storage/media/ecom/screenshot/${encoded}?token=${token}&width=475&height=475&quality=80`;
    return previewUrl
}

export const generateEcomPreview = (id, token) => {
    const ecomPreview = `${protocol}://${host}:${port}/storage/media/ecom/images/${id}.jpeg?token=${token}&t=${new Date().valueOf()}&width=475&height=475&quality=80`;
    return ecomPreview
}

export const addHttp = (url) => {
    if (url.indexOf('http') === -1) {
        url = 'http://' + url;
    }
    return url;
}