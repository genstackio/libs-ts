import parseQs from '../src/utils/parseQs';

describe('isOwnerValid', () => {
    [
        ['', {}],
        ['a=12&b=Hello', { a: '12', b: 'Hello' }],
        ['a=12&b[x]=Hello', { a: '12', b: { x: 'Hello' } }],
        ['a=12&b[z]=world&b[x]=Hello2', { a: '12', b: { x: 'Hello2', z: 'world' } }],
        ['a[=bla', { 'a[': 'bla' }],
        ['a]=bli', { 'a]': 'bli' }],
        ['a]dd[=bli', { 'a]dd[': 'bli' }],
        ['a=42&a[a]=bli', { a: { a: 'bli' } }],
        [
            'c[qq]=fg&c[qqq][zz][dd]=gh&a=12&b[z]=world&b[x]=Hello2',
            { a: '12', b: { x: 'Hello2', z: 'world' }, c: { qq: 'fg', qqq: { zz: { dd: 'gh' } } } },
        ],
        ['a[0]=bli', { a: ['bli'] }],
        ['a[aa]=vb&a[0]=bli', { a: ['bli'] }],
        ['a[3]=bli', { a: [undefined, undefined, undefined, 'bli'] }],
        ['a[0]=bli1&a[4]=bli2&a[3]=bli3', { a: ['bli1', undefined, undefined, 'bli3', 'bli2'] }],
        ['a[]=bli1&a[]=bli2&a[]=bli3', { a: ['bli1', 'bli2', 'bli3'] }],
    ].forEach(([value, expected]: any) =>
        it(`${value} => ${JSON.stringify(expected)}`, () => {
            expect(parseQs(new URLSearchParams(value))).toStrictEqual(expected);
        }),
    );
});
