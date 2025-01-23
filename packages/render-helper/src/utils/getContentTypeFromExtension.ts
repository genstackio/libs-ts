import mimetypes from '../configs/mimetypes';

export function getContentTypeFromExtension(extension: string) {
    return mimetypes[(extension || '').toLowerCase()] || mimetypes['*'];
}

export default getContentTypeFromExtension;
