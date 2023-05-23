import formatDate from '../src';

describe('formatDate', function () {
    (
        [
            [new Date('2023-03-07T14:00:00Z'), 'fr_FR', '07/03/2023'],
            ['2021-12-08T14:00:00Z', 'fr_FR', '08/12/2021'],
            [new Date('2002-09-23T14:00:00Z'), 'fr_FR', '23/09/2002'],
            [new Date('2023-03-07T14:00:00Z'), 'en_US', '3/7/2023'],
            ['2021-12-08T14:00:00Z', 'en_US', '12/8/2021'],
            [new Date('2002-09-23T14:00:00Z'), 'en_US', '9/23/2002'],
        ] as [Date, string | undefined, string][]
    ).forEach(([date, locale, expected]: [Date | number | string, string | undefined, string]) =>
        it(`${date['toISOString'] ? date['toISOString']() : date} ${locale} => ${expected}`, () => {
            expect(formatDate(date, locale)).toEqual(expected);
        }),
    );
});
