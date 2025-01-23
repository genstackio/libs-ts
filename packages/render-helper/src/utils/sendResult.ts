import { result, response, uploaded_redirect, uploaded_return, response_mode } from '../types';
import sendLocateResponse from './sendLocateResponse';
import sendRedirectResponse from './sendRedirectResponse';
import sendReturnResponse from './sendReturnResponse';

const MAX_RETURNABLE_LENGTH = 4500000; // max 4,5Mb

export async function sendResult(
    result: result,
    { extension, name }: { extension: string; name: string },
    responseMode: response_mode,
    uploadAndReturnJsonResponse: uploaded_return,
    uploadAndReturnRedirectResponse: uploaded_redirect,
    res: response,
) {
    if (responseMode === 'locate')
        return sendLocateResponse(res, result, `${name}.${extension}`, uploadAndReturnJsonResponse);
    if (responseMode === 'return' && !(result?.length > MAX_RETURNABLE_LENGTH)) return sendReturnResponse(res, result);
    return sendRedirectResponse(res, result, `${name}.${extension}`, uploadAndReturnRedirectResponse);
}

export default sendResult;
