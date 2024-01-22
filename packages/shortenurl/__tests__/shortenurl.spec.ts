import shortenurl from '../src/utils/shortenurl';

describe('shortenurl', () => {
    [
        ['', undefined],
        ['http://localhost', 'localhost'],
        ['http://local.host', 'local.host'],
        ['https://google.com', 'google.com'],
        ['https://www.google.com', 'google.com'],
        ['https://other.google.com', 'other.google.com'],
        ['https://other.google.com/', 'other.google.com'],
    ].forEach(([value, expected]: any) =>
        it(`${value} => ${expected}`, () => {
            expect(shortenurl(value)).toStrictEqual(expected);
        }),
    );
});
