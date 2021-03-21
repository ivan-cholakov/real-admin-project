import shortid from 'shortid';
export const refactorBlobs = (blobs) => {
    if(!blobs) blobs = [];
    const blobsCopy = blobs.map((x) => {
        return {
            originFileObj:x,
            key:shortid.generate(),
            url:URL.createObjectURL(x),
            name:'croppedPhotoUpload',
            uid:shortid.generate(),
            status:'done',
            type:'image/jpeg',

        }
    })
    return blobsCopy;
}