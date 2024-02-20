export function splitKeys(data: string[] | undefined) {
    const r = [[], {}] as [string[], Record<string, string[]>];
    if (!data) return r;
    return data.reduce((acc, k) => {
        if (-1 < k.indexOf('.')) {
            const [k1, krest] = k.split('.');
            acc[1][k1] = acc[1][k1] || [];
            acc[1][k1].push(krest);
        } else {
            acc[0].push(k);
        }
        return acc;
    }, r);
}

export default splitKeys;
