import { result, response, uploaded_return } from '../types';

export async function sendLocateResponse(
    res: response,
    result: result,
    filename: string,
    uploadAndReturnJsonResponse: uploaded_return,
) {
    const response = await uploadAndReturnJsonResponse(result.stream, result.length, filename, result.contentType);
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.json(response);
}

// noinspection JSUnusedGlobalSymbols
export default sendLocateResponse;
