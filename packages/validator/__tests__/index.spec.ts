import { isValid, clean } from '../src';

describe('isValid', () => {
    (
        [
            ['id', 'a', false],
            ['id', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false],
            ['id', '7dcf09ae-c04e-4d65-bbd4-e0011128c860', true],
            ['code', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true],
            ['code', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', true, 'a'],
            ['code', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false, 'A'],
            ['code', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false, 'B'],
            ['code', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false, 'b'],
            ['code', 'aaaaaaaa a', false],
            ['code', 'aaaaaaaa', true],
            ['code', 'AAAAAAAA', true],
            ['code', 'aaaaaaaa a', false, 'a'],
            ['publicToken', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', false],
            ['publicToken', '7dcf09ae-c04e-4d65-bbd4-e0011128c860', true],
            ['publicToken', 'abcd', false],
            ['privateToken', 'AsC F', false],
            ['compositeToken', '7dcf09ae-c04e-0d65-bbd4-e0011128c860-aaaaaaaaaaa', false],
            ['compositeToken', '7dcf09ae-c04e-0d65-bbd4-e0011128c860-aaaaaaaaaaaa', false],
            ['compositeToken', '7dcf09ae-c04e-4d65-bbd4-e0011128c860-aaaaaaaaaaa', false],
            ['compositeToken', '7dcf09ae-c04e-4d65-bbd4-e0011128c860-aaaaaaaaaaaa', true],
            ['rna', 'aaaaaaaa a', false],
            ['rna', 'W123456789', true],
            ['email', 'o@b', false],
            ['email', 'o@b.', false],
            ['email', 'o@b.c', true],
            ['email', 'o @b.c', false],
            ['phone', '123455', true],
            ['phone', ' 123455', false],
            ['phone', '+33612345678', true],
            ['phone', '+33612345678 Whatsapp', false],
        ] as any[]
    ).forEach(([type, value, expected, startsWith = undefined]: [string, any, boolean, string?]) =>
        it(`${type}(${value}${startsWith ? ` !${startsWith}` : ''}) => ${expected ? 'true' : 'false'}`, () => {
            expect(isValid(type, value, { startsWith })).toEqual(expected);
        }),
    );
});

describe('clean', () => {
    (
        [
            ['id', 'a', undefined],
            ['id', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', undefined],
            ['id', '7dcf09ae-c04e-4d65-bbd4-e0011128c860', '7dcf09ae-c04e-4d65-bbd4-e0011128c860'],
            ['id', '7dcf09ae-c04e-4d65-bbd4-e0011128c860   +', '7dcf09ae-c04e-4d65-bbd4-e0011128c860'],
            ['code', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'],
            ['code', '   aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'],
            ['code', 'aaaaaaaa a', 'aaaaaaaaa'],
            ['code', 'aaaaaaaa', 'aaaaaaaa'],
            ['code', 'AAAAAAAA', 'AAAAAAAA'],
            ['publicToken', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', undefined],
            ['publicToken', '7dcf09ae-c04e-4d65-bbd4-e0011128c860', '7dcf09ae-c04e-4d65-bbd4-e0011128c860'],
            ['publicToken', 'abcd', undefined],
            ['privateToken', 'AsC F', undefined],
            ['compositeToken', '7dcf09ae-c04e-0d65-bbd4-e0011128c860-aaaaaaaaaaa', undefined],
            ['compositeToken', '7dcf09ae-c04e-0d65-bbd4-e0011128c860-aaaaaaaaaaaa', undefined],
            ['compositeToken', '7dcf09ae-c04e-4d65-bbd4-e0011128c860-aaaaaaaaaaa', undefined],
            [
                'compositeToken',
                '7dcf09ae-c04e-4d65-bbd4-e0011128c860-aaaaaaaaaaaa',
                '7dcf09ae-c04e-4d65-bbd4-e0011128c860-aaaaaaaaaaaa',
            ],
            ['rna', 'aaaaaaaa a', undefined],
            ['rna', 'W123456789', 'W123456789'],
            ['email', 'o@b', undefined],
            ['email', 'o@b.', undefined],
            ['email', 'o@b.c', 'o@b.c'],
            ['email', 'o @b.c', 'o@b.c'],
            ['phone', '123455', '123455'],
            ['phone', ' 123455', '123455'],
            ['phone', '+33612345678', '+33612345678'],
            ['phone', '+33612345678 Whatsapp', '+33612345678'],
            ['phone', '+33 612345678', '+33612345678'],
            ['phone', '+336 12 34 56 78', '+33612345678'],
        ] as any[]
    ).forEach(([type, value, expected]: [string, any, any]) =>
        it(`${type}(${value}) => ${expected}`, () => {
            expect(clean(type, value, undefined, {})).toEqual(expected);
        }),
    );
});
