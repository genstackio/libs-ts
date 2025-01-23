import { result, response, uploaded_redirect } from '../types';

export async function sendRedirectResponse(
    res: response,
    result: result,
    filename: string,
    uploadAndReturnRedirectResponse: uploaded_redirect,
) {
    const response = await uploadAndReturnRedirectResponse(result.stream, result.length, filename, result.contentType);
    res.status(response.status || 302);
    Object.entries(response?.headers || {}).forEach(([k, v]) => {
        res.setHeader(k, v);
    });
    if (response?.body) {
        res.send(response.body);
    } else {
        res.end();
    }
}

// noinspection JSUnusedGlobalSymbols
export default sendRedirectResponse;
