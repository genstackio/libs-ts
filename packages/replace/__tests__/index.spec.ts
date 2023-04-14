import replace from '../src';
import valuePath from '../src/utils/valuePath';

describe('replace', () => {
    [
        ['', {}, ''],
        ['a', {}, 'a'],
        ['a {{b}}', {}, 'a '],
        ['a {{b}}', { b: 'hello' }, 'a hello'],
    ].forEach(([pattern, vars, expected]) =>
        it(`${pattern} + ${JSON.stringify(vars)} = ${expected}`, () => {
            expect(replace(pattern, vars)).toEqual(expected);
        }),
    );
    it('', () => {
        expect(true).toBeTruthy();
    });
});

describe('valuePath', () => {
    [
        [undefined, {}, undefined],
        ['k1', {}, undefined],
        ['k1', { k2: 12 }, undefined],
        ['k2', { k2: 12 }, 12],
        ['k2.k3', { k2: 12 }, undefined],
        ['k2.k3', { k2: { k3: 'Hello' } }, 'Hello'],
    ].forEach(([path, data, expected]) =>
        it(`${path} x ${JSON.stringify(data)} => ${expected}`, () => {
            expect(valuePath(path, data)).toEqual(expected);
        }),
    );
});
