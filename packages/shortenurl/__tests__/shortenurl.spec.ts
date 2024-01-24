import shortenurl from '../src/utils/shortenurl';

describe('shortenurl', () => {
    [
        ['', undefined, undefined],
        ['http://localhost', undefined, 'localhost'],
        ['http://local.host', undefined, 'local.host'],
        ['https://google.com', undefined, 'google.com'],
        ['https://www.google.com', undefined, 'google.com'],
        ['https://other.google.com', undefined, 'other.google.com'],
        ['https://other.google.com/', undefined, 'other.google.com'],
        ['https://other.google.com/a/b/c', undefined, 'other.google.com/a/b/c'],
        ['https://other.google.com/a/b/c', false, 'other.google.com/a/b/c'],
        ['https://other.google.com/a/b/c', true, 'other.google.com'],
    ].forEach(([value, domainOnly, expected]: any) =>
        it(`${value} => ${expected}`, () => {
            expect(shortenurl(value, domainOnly)).toStrictEqual(expected);
        }),
    );
});
