export function toLanguageTagLocale(value: string) {
    const [a, b, ...others] = (value || '').replace('_', '-').split('-');
    return `${(a || '').toLowerCase()}-${(b || '').toUpperCase()}${others.join('-')}`;
}

export default toLanguageTagLocale;
