export function marshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const c2 = c.toLowerCase();
        const c3 = c.toUpperCase();
        s = `${s}${c2 === c ? c3 : c2}`;
    }
    return s;
}
export function unmarshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const c2 = c.toLowerCase();
        const c3 = c.toUpperCase();
        s = `${s}${c2 === c ? c3 : c2}`;
    }
    return s;
}
