import formatAmount, { formatRawAmount } from '../src';

const nbsp = String.fromCharCode(160);

describe('formatAmount', function () {
    (
        [
            [0, 'EUR', 2, undefined, `0${nbsp}€`],
            [0.1, 'EUR', 2, undefined, `0,10${nbsp}€`],
            [0.112, 'EUR', 2, undefined, `0,11${nbsp}€`],
            [0.118, 'EUR', 2, undefined, `0,12${nbsp}€`],
            [125.478, 'EUR', 1, undefined, `125,5${nbsp}€`],
            [125.478, 'USD', 2, undefined, `$125.48`],
            [125.478, 'GBP', 4, undefined, `£125.478`],
            [125.478, 'EUR', 1, 'fr-FR', `125,5${nbsp}€`],
            [125.478, 'EUR', 1, 'en-US', `€125.5`],
        ] as [number, string, number, string | undefined, string][]
    ).forEach(([amount, currency, maxDigits, locale, expected]: [number, string, number, string | undefined, string]) =>
        it(`${amount} ${currency} (.${maxDigits}) ${locale} => ${expected}`, () => {
            expect(formatAmount(amount, currency, maxDigits, locale)).toEqual(expected);
        }),
    );
});
describe('formatRawAmount', function () {
    (
        [
            [0, 'EUR', 2, undefined, `0${nbsp}€`],
            [0.1, 'EUR', 2, undefined, `0,00${nbsp}€`],
            [125.478, 'EUR', 1, undefined, `1,3${nbsp}€`],
        ] as [number, string, number, string | undefined, string][]
    ).forEach(([amount, currency, maxDigits, locale, expected]: [number, string, number, string | undefined, string]) =>
        it(`${amount} ${currency} (.${maxDigits}) ${locale} => ${expected}`, () => {
            expect(formatRawAmount(amount, currency, maxDigits, locale)).toEqual(expected);
        }),
    );
});
