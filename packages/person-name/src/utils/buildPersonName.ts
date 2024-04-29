import { person } from '../types';

const formatters = {
    ln: ({ lastName }: person) => lastName,
    fn: ({ firstName }: person) => firstName,
    'ln-fn': ({ firstName, lastName }: person) => `${lastName || ''} ${firstName || ''}`,
    'LN-fn': ({ firstName, lastName }: person) => `${(lastName || '').toUpperCase()} ${firstName || ''}`,
    'LN-FN': ({ firstName, lastName }: person) =>
        `${(lastName || '').toUpperCase()} ${(firstName || '').toUpperCase()}`,
    'fn-ln': ({ firstName, lastName }: person) => `${firstName || ''} ${lastName || ''}`,
    'fn-LN': ({ firstName, lastName }: person) => `${firstName || ''} ${(lastName || '').toUpperCase()}`,
    'FN-LN': ({ firstName, lastName }: person) =>
        `${(firstName || '').toUpperCase()} ${(lastName || '').toUpperCase()}`,
};

const defaultFormatter = 'ln-fn';

export function buildPersonName(person: person, format: string | undefined, defaultName = '?') {
    const formatter = formatters[format || ''] || formatters[defaultFormatter];
    return (formatter(person) || '').trim() || defaultName;
}

export default buildPersonName;
