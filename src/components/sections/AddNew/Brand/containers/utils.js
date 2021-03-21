import b64toBlob from 'b64-to-blob';

export const blobToBase64 = (blob) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
        const base64data = reader.result;
        resolve(base64data);
    }
});

export const getImageFromSessionStorage = (img) => {
    if (!img) {
        return null;
    }
    const item = window.sessionStorage.getItem(img)
    if (!item) {
        return null;
    }
    const data = item.split(',')[1]
    const meta = item.split(';')[0]
    const contentType = meta.split(':')[1]
    return b64toBlob(data, contentType)
}