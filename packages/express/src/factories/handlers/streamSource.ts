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
    return (req: { query?: any }, res: { status: Function; json: Function; setHeader: Function; send: Function }) => {
        fetchSource(sourceDef, sourceOptions)
            .then((source) => {
                if (source?.url) {
                    res.status(source.httpStatusCode || 302);
                    res.setHeader('Location', source.url);
                    res.send();
                    return;
                }
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
