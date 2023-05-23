export function toICULocale(value: string) {
    const [a, b] = (value || '').replace('-', '_').split('_');
    return `${(a || '').toLowerCase()}_${(b || '').toUpperCase()}`;
}

export default toICULocale;
