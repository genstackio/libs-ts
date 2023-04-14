import processFile from './processFile';

export async function streamFileAsync(source: any, params: any, res, ttl = 0, sharedTtl = 0) {
    const { data, contentType } = await processFile(source, params);
    if (!data) {
        res.writeHead(404);
        res.send();
        return;
    }
    const cacheControl: string[] = [];
    ttl > 0 && cacheControl.push(`max-age=${ttl}`);
    sharedTtl > 0 && cacheControl.push(`s-maxage=${sharedTtl}`);
    cacheControl.length > 0 && cacheControl.push('public');
    res.writeHead(200, {
        'Content-Type': contentType,
        ...(params?.hasOwnProperty('download') ? { 'Content-Disposition': 'attachment' } : {}),
        ...(cacheControl.length ? { 'Cache-Control': cacheControl.join(', ') } : {}),
    });
    data.pipe(res);
}

// noinspection JSUnusedGlobalSymbols
export default streamFileAsync;
