export function valuePath(k: any, data: any) {
    if (!k || 'string' !== typeof k) return undefined;

    return k.split(/\./g).reduce((acc, kk) => {
        if (!acc || 'object' !== typeof acc) return undefined;
        return acc[kk];
    }, data);
}

export default valuePath;
