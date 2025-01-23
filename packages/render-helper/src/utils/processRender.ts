import { Readable } from 'stream';
import { renderer, descriptor, request, response, uploaded_redirect, uploaded_return } from '../types';
import stream2buffer from './stream2buffer';
import sendResult from './sendResult';

export function processRender<T, U extends Readable>(
    rawPayload: T,
    descriptor: descriptor,
    renderer: renderer<T, U>,
    uploadAndReturnJsonResponse: uploaded_return,
    uploadAndReturnRedirectResponse: uploaded_redirect,
    res: response,
    req: request,
) {
    const { name, extension, contentType, responseMode } = descriptor(req);
    let payload: T | undefined = rawPayload;
    try {
        payload = 'function' === typeof rawPayload ? rawPayload() : rawPayload;
    } catch (e) {
        payload = undefined;
    }
    (payload?.['then']
        ? payload
        : new Promise((resolve) => {
              resolve(payload);
          }))
        ['then']((xx: T) => {
            const p = renderer(xx);
            p.catch((e) => {
                res.status(500).json({ status: 'error', message: e.message });
            });
            p.then((result: U) => {
                stream2buffer(result)
                    .then((dd) => {
                        sendResult(
                            {
                                length: dd.length,
                                stream: Readable.from(dd),
                                contentType,
                            },
                            { extension, name },
                            responseMode,
                            uploadAndReturnJsonResponse,
                            uploadAndReturnRedirectResponse,
                            res,
                        )
                            .then(() => {
                                // nothing to do
                            })
                            .catch((e: Error) => {
                                res.status(e['code'] || 500).json({ status: 'error', message: e.message });
                            });
                    })
                    .catch((e: Error) => {
                        res.status(e['code'] || 500).json({ status: 'error', message: e.message });
                    });
            });
        })
        .catch((e: Error) => {
            res.status(500).json({ status: 'error', message: e.message });
        });
}

// noinspection JSUnusedGlobalSymbols
export default processRender;
