export function marshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const c2 = String.fromCharCode(c.charCodeAt(0) + 5);
        s = `${s}${c2}`;
    }
    return s;
}
export function unmarshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const x = String.fromCharCode(c.charCodeAt(0) - 5);
        s = `${s}${x}`;
    }
    return s;
}
