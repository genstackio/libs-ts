const isNumeric = (v: string) => /^[0-9]+$/.test(v);
export function fillObject(o: any, key: string, value: string) {
    const s = key.indexOf('[');
    const e = key.indexOf(']');
    if (-1 === s || -1 === e || s > e) {
        if (isNumeric(key)) {
            const intKey = parseInt(key);
            if (o.length < intKey - 1) {
                for (let i = o.length; i <= intKey; i++) {
                    o.push(undefined);
                }
            }
            o[intKey] = value;
        } else {
            o[key] = value;
        }
        return;
    }
    const parentKey = key.slice(0, s);
    const subKey = key.slice(s + 1, e);
    const rest = key.slice(e + 1);
    o[parentKey] = o[parentKey] || {};
    let newKey = `${subKey}${rest || ''}`;
    if (isNumeric(newKey) || '' === newKey) {
        if (!Array.isArray(o[parentKey])) {
            o[parentKey] = [];
        }
        if ('' === newKey) {
            newKey = String(o[parentKey].length);
        }
    } else {
        if ('object' !== typeof o[parentKey]) {
            o[parentKey] = {};
        }
    }
    fillObject(o[parentKey], newKey, value);
}

export default fillObject;
