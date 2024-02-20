import splitKeys from '../src/utils/splitKeys';

describe('splitKeys', () => {
    (
        [
            [undefined, [[], {}]],
            [[], [[], {}]],
            [['a'], [['a'], {}]],
            [['a.b'], [[], { a: ['b'] }]],
            [
                ['a', 'a.b'],
                [['a'], { a: ['b'] }],
            ],
        ] as [string[] | undefined, [string[], Record<string, unknown>]][]
    ).forEach(([data, expected]) =>
        it(`${JSON.stringify(data)} => ${JSON.stringify(expected)}`, () => {
            expect(splitKeys(data)).toEqual(expected);
        }),
    );
});
