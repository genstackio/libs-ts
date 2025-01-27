import { request, response_mode } from '../types';
import getContentTypeFromExtension from './getContentTypeFromExtension';

export function defaultDescriptor(req: request) {
    const name = String(req.params?.file || req.params?.name || 'file');
    const extension = (req.params?.ext as string) || '';
    const contentType = getContentTypeFromExtension(extension);

    let responseMode: response_mode = 'return';

    if (false === req.query.return || 'false' === req.query.return || 0 === req.query.return) {
        responseMode = 'locate';
    } else if ('true' === req.query.redirect) {
        responseMode = 'redirect';
    }

    return { name, extension, contentType, responseMode };
}

// noinspection JSUnusedGlobalSymbols
export default defaultDescriptor;
