import objectSwitch from '../src/utils/objectSwitch';

describe('objectSwitch', () => {
    [
        [undefined, {}, undefined, undefined, undefined],
        ['', {}, undefined, undefined, undefined],
        ['the value', {}, undefined, undefined, 'the value'],
        [() => 'test1', {}, undefined, undefined, 'test1'],
        [({ a }: any) => (a === 'hello' ? 'world' : 'bye'), { a: 'hello' }, undefined, undefined, 'world'],
        [({ a }: any) => (a === 'hello' ? 'world' : 'bye'), { a: 'not hello' }, undefined, undefined, 'bye'],
        [{ 'prop1:hello': 'a', 'prop1:world': 'b', '*': 'c' }, { prop1: 'an other value' }, undefined, undefined, 'c'],
        [{ 'prop1:hello': 'a', 'prop1:world': 'b' }, { prop1: 'world' }, undefined, undefined, 'b'],
        [
            { 'prop1:hello': 'a', 'prop1:world': 'b', 'prop3:bla': 'c', 'prop3:bli': 'd' },
            { prop1: 'an other value', prop3: 'bli' },
            undefined,
            undefined,
            'd',
        ],
        [
            {
                'prop1:hello': 'a',
                'prop1:world': 'b',
                'prop3:bla': 'c',
                'prop3:bli': { 'prop4:bye': 'the other value', 'prop4:rebye': 'the other other value' },
            },
            { prop1: 'an other value', prop3: 'bli', prop4: 'rebye' },
            undefined,
            undefined,
            'the other other value',
        ],
    ].forEach(([o, context, replaceVars, exists, expected]: any) =>
        it(`${JSON.stringify(o)} + ${JSON.stringify(context)} = ${JSON.stringify(expected)}`, () => {
            expect(objectSwitch(o, context, replaceVars, exists)).toEqual(expected);
        }),
    );
});
