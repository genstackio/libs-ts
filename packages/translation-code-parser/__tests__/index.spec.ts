import parseTranslationCode, { unparseTranslationCode } from '../src';

describe('parseTranslationCode', function () {
    (
        [
            ['.ab', undefined, ['_', undefined, 'ab']],
            ['.abCd', undefined, ['_', undefined, 'abCd']],
            ['@ab_cd/efGh', undefined, ['__', 'ab_cd', 'efGh']],
            ['/xyz/12345/bla', undefined, ['xyz', '12345', 'bla']],
        ] as [string, string | undefined, [string, string | undefined, string]][]
    ).forEach(([code, domain, expected]: [string, string | undefined, [string, string | undefined, string]]) =>
        it(`${code} ${domain ? `(${domain})` : ''} => ${JSON.stringify(expected)}`, () => {
            expect(parseTranslationCode(code, domain)).toEqual(expected);
        }),
    );
});

describe('unparseTranslationCode', function () {
    (
        [
            ['.ab', undefined, ['_', undefined, 'ab']],
            ['.abCd', undefined, ['_', undefined, 'abCd']],
            ['@ab_cd/efGh', undefined, ['__', 'ab_cd', 'efGh']],
            ['/xyz/12345/bla', undefined, ['xyz', '12345', 'bla']],
        ] as [string, string | undefined, [string, string | undefined, string]][]
    ).forEach(([code, domain, incoming]: [string, string | undefined, [string, string | undefined, string]]) =>
        it(`${JSON.stringify(incoming)} => ${code} ${domain ? `(${domain})` : ''}`, () => {
            expect(unparseTranslationCode(incoming)).toEqual({ code, domain });
        }),
    );
});
