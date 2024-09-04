import secretize, { unsecretize, options } from '../src';
import base64 from 'base64url';

const decode = base64.decode;
const encode = base64.encode;

describe('secretize', () => {
    (
        [
            ['', '', {}, ''],
            ['a', '', {}, ''],
            ['a', 'x01', {}, 'a'],
            ['aBc', 'a6Z', {}, 'A1B0C1'],
            ['ABCD', 'a6Z', {}, 'A0B0C0D0'],
            ['a{b;C', 'a6Z', {}, 'A1{0B1;0C0'],
            ['a{b;C', 'a6Zgt8', {}, 'a110{000b110;000c100'],
            ['abcde', 'Zq6', {}, 'fghij'],
            ['{"a": 42}', 'Zq6', {}, "'f'?%97"],
            ['{"a": 45}', 'oi2', {}, '{"g": 45}'],
            ['this is a Secret', 'oi2a6ZZq6', {}, '_6S6T6^6%5T6^6%5L6%5^5P6N6]6P6_6'],
            ['this is a Secret', 'x3j', { helpers: { x3j: encode } }, 'dGhpcyBpcyBhIFNlY3JldA'],
            ['this is 1 Secret #4', 'yU6', {}, 'this is 4 Secret #1'],
            ['this is a Secret', 'x3jZq6', { helpers: { x3j: encode } }, 'iLmuh~Guh~GmNKSq^8OqiF'],
            ['this is a Secret', 'x3jZq6tJq', { helpers: { x3j: encode } }, 'IlMUH~gUH~gMnksQ^8oQIf'],
            ['this is a Secret', 'x3jZq6tJqx3j', { helpers: { x3j: encode } }, 'SWxNVUh-Z1VIfmdNbmtzUV44b1FJZg'],
            ['this is a Secret', 'x3jZq6tJqx3jyU6', { helpers: { x3j: encode } }, 'SWxNVUh-Z4VIfmdNbmtzUV11b4FJZg'],
            ['this is a Secret', 'x3jZq6tJqx3jyU6tJq', { helpers: { x3j: encode } }, 'swXnvuH-z4viFMDnBMTZuv11B4fjzG'],
        ] as [string, string, options, string][]
    ).forEach(([data, algos, options, expected]) =>
        it(`${algos}(${data}) + ${JSON.stringify(options)} => ${expected}`, () => {
            expect(secretize(data, algos, options)).toEqual(expected);
        }),
    );
});

describe('unsecretize', () => {
    (
        [
            ['', '', {}, ''],
            ['', '', {}, ''],
            ['a', 'x01', {}, 'a'],
            ['aBc', 'a6Z', {}, 'A1B0C1'],
            ['ABCD', 'a6Z', {}, 'A0B0C0D0'],
            ['a{b;C', 'a6Z', {}, 'A1{0B1;0C0'],
            ['a{b;C', 'a6Zgt8', {}, 'a110{000b110;000c100'],
            ['abcde', 'Zq6', {}, 'fghij'],
            ['{"a": 42}', 'Zq6', {}, "'f'?%97"],
            ['{"a": 45}', 'oi2', {}, '{"g": 45}'],
            ['this is a Secret', 'oi2a6ZZq6', {}, '_6S6T6^6%5T6^6%5L6%5^5P6N6]6P6_6'],
            ['this is a Secret', 'x3j', { helpers: { j3x: decode } }, 'dGhpcyBpcyBhIFNlY3JldA'],
            ['this is 1 Secret #4', 'yU6', {}, 'this is 4 Secret #1'],
            ['this is a Secret', 'x3jZq6', { helpers: { j3x: decode } }, 'iLmuh~Guh~GmNKSq^8OqiF'],
            ['this is a Secret', 'x3jZq6tJq', { helpers: { j3x: decode } }, 'IlMUH~gUH~gMnksQ^8oQIf'],
            ['this is a Secret', 'x3jZq6tJqx3jyU6', { helpers: { j3x: decode } }, 'SWxNVUh-Z4VIfmdNbmtzUV11b4FJZg'],
            ['this is a Secret', 'x3jZq6tJqx3jyU6tJq', { helpers: { j3x: decode } }, 'swXnvuH-z4viFMDnBMTZuv11B4fjzG'],
        ] as [string, string, options, string][]
    ).forEach(([expected, algos, options, data]) =>
        it(`${algos}(${data}) + ${JSON.stringify(options)} => ${expected}`, () => {
            expect(unsecretize(data, algos, options)).toEqual(expected);
        }),
    );
});
