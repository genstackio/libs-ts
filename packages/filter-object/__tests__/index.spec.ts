import filterObject from '../src/utils/filterObject';

describe('filterObject', () => {
    (
        [
            [undefined, [], [], undefined],
            [{}, [], [], {}],
            [{ a: 42 }, [], [], { a: 42 }],
            [{ a: undefined }, [], [], {}],
            [{ a: 42 }, ['a'], [], {}],
            [{ a: 42, b: 'hello' }, ['a'], [], { b: 'hello' }],
            [{ a: 42, b: 'hello' }, ['b'], [], { a: 42 }],
            [{ a: 42, b: 'hello' }, ['a', 'b'], [], {}],
            [{ a: 42, b: 'hello' }, ['b', 'a'], [], {}],
            [{ a: 42, b: 'hello' }, ['a', 'b'], ['a'], { a: 42 }],
            [{ a: 42, b: 'hello' }, ['a', 'b'], ['a', 'b'], { a: 42, b: 'hello' }],
            [{ a: 42, b: 'hello', c: true }, ['a', 'b'], ['a', 'b'], { a: 42, b: 'hello', c: true }],
            [{ a: 42, b: 'hello', c: true }, [], ['a', 'b'], { a: 42, b: 'hello', c: true }],
            [{ a: 42, b: 'hello', c: true }, [], [], { a: 42, b: 'hello', c: true }],
            [{ a: 42, b: 'hello', c: true }, ['b'], [], { a: 42, c: true }],
            [{ abcd: 42, abef: 'hello', abegh: true, c: 42, f: 'hello' }, ['a*'], [], { c: 42, f: 'hello' }],
            [{ abcd: 42, abef: 'hello', abegh: true, c: 42, f: 'hello' }, ['ab*'], [], { c: 42, f: 'hello' }],
            [
                { abcd: 42, abef: 'hello', abegh: true, c: 42, f: 'hello' },
                ['abe*'],
                [],
                { abcd: 42, c: 42, f: 'hello' },
            ],
            [
                { abcd: 42, abef: 'hello', abegh: true, c: 42, f: 'hello' },
                ['abe*'],
                ['abegh'],
                { abcd: 42, abegh: true, c: 42, f: 'hello' },
            ],
            [
                { abcd: 42, abef: 'hello', abegh: true, c: 42, f: 'hello' },
                ['abe*'],
                ['abeg*'],
                { abcd: 42, abegh: true, c: 42, f: 'hello' },
            ],
        ] as [Record<string, unknown>, string[], string[], Record<string, unknown>][]
    ).forEach(([data, excludes, includes, expected]) =>
        it(`${JSON.stringify(data)} / excludes:${JSON.stringify(excludes)} / includes:${JSON.stringify(
            includes,
        )} => ${JSON.stringify(expected)}`, () => {
            expect(filterObject(data, excludes, includes)).toEqual(expected);
        }),
    );
});
