import { streamFile } from '@genstackio/streamer';
import { fetchSource } from '@genstackio/fetcher';

export function streamSource(
    sourceDef: string | Function | undefined,
    sourceOptions: Record<string, unknown> | undefined,
    sourceExtra: object,
    processor: Function | undefined = undefined,
    ttl = 0,
    sharedTtl = 0,
) {
    return (req: {query?: any}, res: {status: Function, json: Function}) => {
        fetchSource(sourceDef, sourceOptions)
            .then((source) => {
                streamFile(
                    sourceExtra ? { ...(source || {}), ...(sourceExtra || {}) } : source,
                    { ...(req.query || {}), processor },
                    res,
                    ttl,
                    sharedTtl,
                );
            })
            .catch((e) => {
                res.status(404);
                res.json({ status: 'error', message: e.message });
            });
    };
}

export default streamSource;
