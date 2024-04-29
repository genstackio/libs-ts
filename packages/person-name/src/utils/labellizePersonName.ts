import { person } from '../types';
import buildPersonName from './buildPersonName';
import labellizeObfuscatedPersonName from './labellizeObfuscatedPersonName';

export function labellizePersonName(
    person: person,
    format: string | undefined,
    mode: string | undefined,
    allPersons?: person[],
    defaultName = '?',
) {
    switch ((mode || '').toLowerCase()) {
        case 'obfuscated':
            return labellizeObfuscatedPersonName(person, format, allPersons).trim() || defaultName;
        default:
            return buildPersonName(person, format);
    }
}

export default labellizePersonName;
