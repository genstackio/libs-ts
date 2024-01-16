import encode from '../src/utils/encode';

describe('encode', () => {
    [
        [undefined, ''],
        ['', ''],
        [false, ''],
        [[], ''],
        [true, ''],
        [{}, ''],
        [{ a: { d: 'e' } }, 'a=d:e'],
        [{ a: {} }, 'a='],
        [{ a: { b: 'c', d: 'e' }, f: { z: 't' } }, 'a=b:c;d:e,f=z:t'],
        [{ f: { z: 't' }, a: { d: 'e', b: 'c' } }, 'a=b:c;d:e,f=z:t'],
    ].forEach(([value, expected]: any) =>
        it(`${JSON.stringify(value)} => ${expected}`, () => {
            expect(encode(value)).toStrictEqual(expected);
        }),
    );
});
