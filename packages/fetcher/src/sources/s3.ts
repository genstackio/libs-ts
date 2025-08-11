import { s3 as s3Service } from '@ohoareau/aws';

export async function s3(path: string, options?: any) {
    const [bucket, ...keys] = path.split('/');
    const key = keys.join('/');
    const f = await s3Service.getFile({ bucket, key, raw: true });
    if (options?.maxReturnableLength > 0) {
        if ((f.length || 0) > options.maxReturnableLength) {
            if (options.getPresignedGetUrl) {
                const url = await options.getPresignedGetUrl({ bucket, key, ttl: options.presignUrlTtl || 60 * 60 });
                return {
                    url,
                    length: f.length,
                    fileName: key,
                };
            }
        }
    }
    return {
        input: f.body,
        length: f.length,
        fileName: key,
    };
}

export default s3;
