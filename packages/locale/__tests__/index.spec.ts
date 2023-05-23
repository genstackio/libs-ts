import { toICULocale, toLanguageTagLocale } from '../src';

describe('toICULocale', () => {
    [
        ['aa_aa', 'aa_AA'],
        ['aa-ab', 'aa_AB'],
        ['Aa_bA', 'aa_BA'],
        ['CC-DD', 'cc_DD'],
    ].forEach(([value, expected]) =>
        it(`${value} => ${expected}`, () => {
            expect(toICULocale(value)).toEqual(expected);
        }),
    );
});

describe('toICULocale', () => {
    [
        ['aa_aa', 'aa-AA'],
        ['aa-ab', 'aa-AB'],
        ['Aa_bA', 'aa-BA'],
        ['CC-DD', 'cc-DD'],
    ].forEach(([value, expected]) =>
        it(`${value} => ${expected}`, () => {
            expect(toLanguageTagLocale(value)).toEqual(expected);
        }),
    );
});
