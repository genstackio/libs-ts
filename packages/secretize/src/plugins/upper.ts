export function marshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const c2 = c.toUpperCase();
        s = `${s}${c2}${c2 === c ? '0' : '1'}`;
    }
    return s;
}
export function unmarshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i = i + 2) {
        const c = data[i];
        const x = data[i + 1];
        s = `${s}${'0' === x ? c : c.toLowerCase()}`;
    }
    return s;
}
