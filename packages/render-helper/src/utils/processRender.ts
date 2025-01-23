import { Readable } from 'stream';
import toArray from 'stream-to-array';
import { renderer, request, response, uploaded_redirect, uploaded_return } from '../types';

const MAX_RETURNABLE_LENGTH = 4500000; // max 4,5Mb

async function stream2buffer(streamOrBuffer: Readable | Buffer) {
    return streamOrBuffer instanceof Buffer
        ? streamOrBuffer
        : Buffer.concat(
              (await toArray(streamOrBuffer)).reduce((buffers: Uint8Array[], part: unknown) => {
                  // eslint-disable-next-line
            buffers.push(part instanceof Buffer ? part : Buffer.from(part as any));
                  return buffers;
              }, [] as Buffer[]),
          );
}

export function processRender<T, U extends Readable>(
    rawPayload: T,
    { contentType, extension, name = 'file' }: { contentType: string; extension: string; name?: string },
    renderer: renderer<T, U>,
    uploadAndReturnJsonResponse: uploaded_return,
    uploadAndReturnRedirectResponse: uploaded_redirect,
    res: response,
    req: request,
) {
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
                            uploadAndReturnJsonResponse,
                            uploadAndReturnRedirectResponse,
                            req,
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

async function sendResult(
    result: { length: number; stream: Readable; contentType: string; extraHeaders?: { name: string; value: string }[] },
    { extension, name }: { extension: string; name: string },
    uploadAndReturnJsonResponse: uploaded_return,
    uploadAndReturnRedirectResponse: uploaded_redirect,
    req: request,
    res: response,
) {
    if (false === req.query.return || 'false' === req.query.return || 0 === req.query.return) {
        const response = await uploadAndReturnJsonResponse(
            result.stream,
            result.length,
            `${req.params?.file || req.params?.name || name}.${req.params?.ext || extension}`,
            result.contentType,
        );
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.json(response);
    } else {
        if ('true' === req.query.redirect || result?.length > MAX_RETURNABLE_LENGTH) {
            const response = await uploadAndReturnRedirectResponse(
                result.stream,
                result.length,
                `${req.params?.file || req.params?.name || name}.${req.params?.ext || extension}`,
                result.contentType,
            );
            res.status(response.status || 302);
            Object.entries(response?.headers || {}).forEach(([k, v]) => {
                res.setHeader(k, v);
            });
            if (response?.body) {
                res.send(response.body);
            } else {
                res.end();
            }
            return;
        }
        res.setHeader('Content-Type', result.contentType);
        (result.extraHeaders || []).forEach((h) => res.setHeader(h.name, h.value));
        result.stream.pipe(res);
    }
}

// noinspection JSUnusedGlobalSymbols
export default processRender;
