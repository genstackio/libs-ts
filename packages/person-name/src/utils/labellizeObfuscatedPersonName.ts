import { person } from '../types';
import buildPersonName from './buildPersonName';

function alterPerson(person: person, minLastNameChars: number | undefined) {
    if (undefined === minLastNameChars) return person;
    const t = person.lastName || '';
    const isFull = t.length <= minLastNameChars;
    let v = t.slice(0, minLastNameChars);
    if (!isFull) {
        if (v.slice(-1) === ' ') {
            minLastNameChars++;
            v = t.slice(0, minLastNameChars);
        }
        if (t.length > minLastNameChars) {
            if (t.slice(minLastNameChars, minLastNameChars + 1) === ' ') v = t.slice(0, minLastNameChars + 2);
        }
    }
    return { ...person, lastName: `${v}${isFull ? '' : '.'}` };
}
function buildKey(person: person, chars: number) {
    const p = alterPerson(person, chars);
    const t = p.lastName || '';
    const t2 = p.firstName || '';
    return `${t} ${t2}`.trim().toLowerCase();
}
function obfuscate(person: person, allPersons: person[], additionalChars: number) {
    const k = buildKey(person, additionalChars + 1);
    const id = person?.id || undefined;
    return !!allPersons.find(
        (p: person) => buildKey(p, additionalChars + 1) === k && (!id || id !== (p?.id || undefined)),
    )
        ? obfuscate(person, allPersons, additionalChars + 1)
        : alterPerson(person, additionalChars + 1);
}
export function labellizeObfuscatedPersonName(
    person: person,
    format?: string | undefined,
    allPersons?: person[],
    defaultName = '?',
) {
    return buildPersonName(obfuscate(person, allPersons || [], 0), format, defaultName);
}

export default labellizeObfuscatedPersonName;
