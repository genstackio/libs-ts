export function filterObject(o: Record<string, unknown>, excludes: string[], includes: string[]) {
    if (!o || 'object' !== typeof o) return undefined;

    const wildcarIncludes = includes
        .filter((x: string) => x.indexOf('*') > -1)
        .map((x: string) => new RegExp(x.replace(/\*/g, '.*')));
    const wildcarExcludes = excludes
        .filter((x: string) => x.indexOf('*') > -1)
        .map((x: string) => new RegExp(x.replace(/\*/g, '.*')));
    const includesMap = includes.reduce((acc, k) => Object.assign(acc, { [k]: true }), {} as Record<string, unknown>);
    const excludesMap = excludes.reduce((acc, k) => Object.assign(acc, { [k]: true }), {} as Record<string, unknown>);

    return Object.entries(o).reduce((acc, [k, v]) => {
        if (undefined === v || null === v) return acc;
        if (includesMap[k]) {
            acc[k] = v;
            return acc;
        }
        if (wildcarIncludes.find((r) => r.test(k))) {
            acc[k] = v;
            return acc;
        }
        if (excludesMap[k]) {
            return acc;
        }
        if (wildcarExcludes.find((r) => r.test(k))) {
            return acc;
        }
        acc[k] = v;
        return acc;
    }, {} as Record<string, unknown>);
}

export default filterObject;
