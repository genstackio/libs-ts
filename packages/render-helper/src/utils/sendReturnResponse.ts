import { result, response } from '../types';

export async function sendReturnResponse(res: response, result: result) {
    res.setHeader('Content-Type', result.contentType);
    (result.extraHeaders || []).forEach((h) => res.setHeader(h.name, h.value));
    result.stream.pipe(res);
}

// noinspection JSUnusedGlobalSymbols
export default sendReturnResponse;
