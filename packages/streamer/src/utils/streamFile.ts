import streamFileAsync from './streamFileAsync';

export function streamFile(
    source: unknown,
    params: unknown,
    res: { status: Function; json: Function },
    ttl = 0,
    sharedTtl = 0,
) {
    streamFileAsync(source, params, res, ttl, sharedTtl)
        .then(() => {
            return;
        })
        .catch((e) => {
            res.status(404);
            res.json({ status: 'error', message: e.message });
        });
}

// noinspection JSUnusedGlobalSymbols
export default streamFile;
