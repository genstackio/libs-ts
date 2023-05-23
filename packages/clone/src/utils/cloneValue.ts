export function cloneValue(a: unknown) {
    if (!a) return a;
    if ('object' !== typeof a) return a;
    if (Array.isArray(a)) return a.map((x) => cloneValue(x));
    return Object.entries(a).reduce((acc, [k, v]) => Object.assign(acc, { [k]: cloneValue(v) }), {});
}

export default cloneValue;
