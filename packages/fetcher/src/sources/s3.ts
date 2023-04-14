import { s3 as s3Service } from '@ohoareau/aws';

export async function s3(path: string) {
    const [bucket, ...keys] = path.split('/');
    const key = keys.join('/');
    return {
        input: (await s3Service.getFile({ bucket, key, raw: true })).body,
        fileName: key,
    };
}

export default s3;
