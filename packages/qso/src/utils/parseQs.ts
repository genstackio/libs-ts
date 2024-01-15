import fillObject from './fillObject';

export function parseQs(x: URLSearchParams) {
    const o: Record<string, any> = {};
    x.forEach((value: string, key: string) => {
        fillObject(o, key, value);
    });
    return o;
}

export default parseQs;
