import parseObjdsl from '../src/utils/parseObjdsl';

describe('parseObjdsl', () => {
    [
        ['', {}],
        ['a=d:e', { a: { d: 'e' } }],
        ['a=', { a: {} }],
        ['a=b:c;d:e,f=z:t', { a: { b: 'c', d: 'e' }, f: { z: 't' } }],
    ].forEach(([value, expected]: any) =>
        it(`${value} => ${JSON.stringify(expected)}`, () => {
            expect(parseObjdsl(value)).toStrictEqual(expected);
        }),
    );
});
