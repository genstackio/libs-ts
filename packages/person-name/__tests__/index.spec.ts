import { person } from '../src/types';
import labellizePersonName from '../src';

describe('labellizePersonName', function () {
    (
        [
            [{}, undefined, undefined, '?'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, undefined, undefined, 'Hoareau Olivier'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, 'ln', undefined, 'Hoareau'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, 'LN-fn', undefined, 'HOAREAU Olivier'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, 'LN-FN', undefined, 'HOAREAU OLIVIER'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, 'fn', undefined, 'Olivier'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, 'fn-LN', undefined, 'Olivier HOAREAU'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, 'FN-LN', undefined, 'OLIVIER HOAREAU'],
        ] as [person, string | undefined, string | undefined, string][]
    ).forEach(([person, format, mode, expected]: [person, string | undefined, string | undefined, string]) =>
        it(`${JSON.stringify(person)} / ${format || '-'} / ${mode || '-'} => ${expected}`, () => {
            expect(labellizePersonName(person, format, mode)).toEqual(expected);
        }),
    );
});

describe('labellizePersonName (unique in list)', function () {
    (
        [
            [{}, undefined, undefined, [], '?'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, undefined, undefined, [], 'Hoareau Olivier'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, undefined, 'obfuscated', [], 'H. Olivier'],
            [{ firstName: 'Olivier', lastName: 'Hoareau' }, 'fn-ln', 'obfuscated', [], 'Olivier H.'],
            [
                { firstName: 'Olivier', lastName: 'Hoareau' },
                undefined,
                'obfuscated',
                [{ firstName: 'Olivia', lastName: 'Hoareau' }],
                'H. Olivier',
            ],
            [
                { firstName: 'Olivier', lastName: 'Hoareau' },
                undefined,
                'obfuscated',
                [{ firstName: 'Maurice', lastName: 'Hoareau' }],
                'H. Olivier',
            ],
            [
                { firstName: 'Olivier', lastName: 'Hoareau' },
                undefined,
                'obfuscated',
                [{ firstName: 'Olivier', lastName: 'Horse' }],
                'Hoa. Olivier',
            ],
            [
                { firstName: 'Olivier', lastName: 'Hoareau' },
                'LN-FN',
                'obfuscated',
                [{ firstName: 'Olivier', lastName: 'Horse' }],
                'HOA. OLIVIER',
            ],
            [
                { firstName: 'Olivier', lastName: 'Hoareau' },
                'fn-LN',
                'obfuscated',
                [{ firstName: 'Olivier', lastName: 'Horse' }],
                'Olivier HOA.',
            ],
            [
                { firstName: 'Olivier', lastName: 'De Hoareau' },
                'fn-LN',
                'obfuscated',
                [{ firstName: 'Olivier', lastName: 'De Horse' }],
                'Olivier DE HOA.',
            ],
            [
                { firstName: 'Olivier', lastName: 'De Hoareau' },
                'fn-LN',
                'obfuscated',
                [{ firstName: 'Olivier', lastName: 'Du Horse' }],
                'Olivier DE H.',
            ],
        ] as [person, string | undefined, string | undefined, person[], string][]
    ).forEach(
        ([person, format, mode, allPersons, expected]: [
            person,
            string | undefined,
            string | undefined,
            person[],
            string,
        ]) =>
            it(`${JSON.stringify(person)} / ${format || '-'} / ${mode || '-'} [${JSON.stringify(
                allPersons,
            )}] => ${expected}`, () => {
                expect(labellizePersonName(person, format, mode, allPersons)).toEqual(expected);
            }),
    );
});
