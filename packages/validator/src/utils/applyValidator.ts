export function applyValidator(v: any, value: any, { startsWith }: { startsWith?: string } = {}) {
    value = value || '';
    if (!!startsWith && value.slice(0, startsWith.length) !== startsWith) return false;

    return !v || v.test(value);
}

export default applyValidator;
