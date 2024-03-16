export function marshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const c2 = /[a-z]/i.test(c) ? String.fromCharCode(c.charCodeAt(0) + 6) : c;
        s = `${s}${c2}`;
    }
    return s;
}
export function unmarshall(data: string) {
    let s = '';
    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        const x = /[a-z]/i.test(c) ? String.fromCharCode(c.charCodeAt(0) - 6) : c;
        s = `${s}${x}`;
    }
    return s;
}
