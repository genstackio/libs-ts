import { readFileSync } from 'fs';
import { resolve } from 'path';

export async function local(path: string, options: Record<string, any> = {}) {
    if (!options.localRoot) {
        if (!options.localAllowedRoot) {
            throw new Error(`No local root specified for local source`);
        }
    }

    if (options.localAllowedRoot) {
        path = resolve(path);
        if (!path) throw new Error('No location');
        if (options.localAllowedRoot !== path.slice(0, options.localAllowedRoot.length))
            throw new Error(`Unauthorized location`);
    }

    return {
        input: Buffer.from(readFileSync(`${options.localRoot ? `${options.localRoot}/` : ''}${path}`)),
        fileName: path,
    };
}

export default local;
