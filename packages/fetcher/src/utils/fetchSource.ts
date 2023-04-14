import * as sourceTypes from '../sources';

export async function fetchSource(source: string | Function | undefined, options?: Record<string, any>) {
    let fetcher: Function | undefined;

    if ('function' === typeof source) {
        fetcher = sourceTypes['fn'];
    } else {
        if (!source) return { input: undefined, fileName: 'file' };
        const dsn = source as string;
        const i = dsn.indexOf('://');
        if (-1 === i) throw new Error(`Unsupported source format`);
        const type = dsn.slice(0, i);
        source = dsn.slice(i + 3);
        fetcher = sourceTypes[type];
        if (!fetcher) throw new Error(`Unknown source type '${type}'`);
    }

    return fetcher!(source, options);
}

export default fetchSource;
