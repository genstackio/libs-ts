function entriesSorter(a: [string, unknown], b: [string, unknown]) {
    return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
}

function encode(o: unknown) {
    if (!o) return '';
    if ('object' !== typeof o) return '';
    const entries = Object.entries(o);
    if (!entries.length) return '';
    entries.sort(entriesSorter);
    return entries
        .map(([k, v]) => {
            let value: unknown;
            if (!!v && 'object' === typeof v && !Array.isArray(v)) {
                value = Object.entries(v)
                    .sort(entriesSorter)
                    .reduce((acc, [kk, vv]) => {
                        acc.push(`${kk}:${String(vv)}`);
                        return acc;
                    }, [] as string[])
                    .join(';');
            }
            return `${k}=${value || ''}`;
        })
        .join(',');
}
export default encode;
