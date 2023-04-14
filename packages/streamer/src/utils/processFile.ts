import { Readable } from 'stream';
import detectContentTypeFromFileName from '@genstackio/content-type/lib/utils/detectContentTypeFromFileName';

export async function processFile(
    { input, fileName }: { input: Buffer | string; fileName: string },
    { processor, ...params }: any = {},
) {
    input = 'string' === typeof input ? Buffer.from(input) : (input as Buffer);
    const [contentType, format] = detectContentTypeFromFileName(fileName) || [undefined, undefined];
    processor && (input = await processor(input, params, { contentType, format }));
    const readable = !!input ? Readable.from(input) : undefined;

    return {
        status: 'success',
        data: readable,
        contentType,
        length: !!input ? input.length : 0,
    };
}

export default processFile;
