import requestItems from '../src';

describe('requestItems', function () {
    (
        [
            [[], undefined, []],
            [[], 3, []],
            [[{ id: 'bla', units: 1 }], 12, [{ id: 'bla', quantity: 12, product: { id: 'bla', units: 1 } }]],
            [
                [
                    { id: 'blo', units: 1 },
                    { id: 'bli', units: 10 },
                ],
                12,
                [
                    { id: 'bli', quantity: 1, product: { id: 'bli', units: 10 } },
                    { id: 'blo', quantity: 2, product: { id: 'blo', units: 1 } },
                ],
            ],
            [
                [
                    { id: 'pack1', units: 1 },
                    { id: 'pack2', units: 2 },
                    { id: 'pack3', units: 5 },
                    { id: 'pack4', units: 11 },
                    { id: 'pack5', units: 23 },
                ],
                8,
                [
                    { id: 'pack3', quantity: 1, product: { id: 'pack3', units: 5 } },
                    { id: 'pack2', quantity: 1, product: { id: 'pack2', units: 2 } },
                    { id: 'pack1', quantity: 1, product: { id: 'pack1', units: 1 } },
                ],
            ],
            [
                [
                    { id: 'pack1', units: 1 },
                    { id: 'pack2', units: 2 },
                    { id: 'pack3', units: 5 },
                    { id: 'pack4', units: 11 },
                    { id: 'pack5', units: 23 },
                ],
                9,
                [
                    { id: 'pack3', quantity: 1, product: { id: 'pack3', units: 5 } },
                    { id: 'pack2', quantity: 2, product: { id: 'pack2', units: 2 } },
                ],
            ],
            [
                [
                    { id: 'pack1', units: 1 },
                    { id: 'pack2', units: 2 },
                    { id: 'pack3', units: 5 },
                    { id: 'pack4', units: 11 },
                    { id: 'pack5', units: 23 },
                ],
                43,
                [
                    { id: 'pack5', quantity: 1, product: { id: 'pack5', units: 23 } },
                    { id: 'pack4', quantity: 1, product: { id: 'pack4', units: 11 } },
                    { id: 'pack3', quantity: 1, product: { id: 'pack3', units: 5 } },
                    { id: 'pack2', quantity: 2, product: { id: 'pack2', units: 2 } },
                ],
            ],
            [
                [
                    { id: 'pack1', units: 1 },
                    { id: 'pack2', units: 2 },
                    { id: 'pack3', units: 5 },
                    { id: 'pack4', units: 11 },
                    { id: 'pack5', units: 23 },
                ],
                430,
                [
                    { id: 'pack5', quantity: 18, product: { id: 'pack5', units: 23 } },
                    { id: 'pack4', quantity: 1, product: { id: 'pack4', units: 11 } },
                    { id: 'pack3', quantity: 1, product: { id: 'pack3', units: 5 } },
                ],
            ],
            [
                [
                    { id: 'pack1', units: 1 },
                    { id: 'pack4', units: 11 },
                    { id: 'pack3', units: 5 },
                    { id: 'pack5', units: 23 },
                    { id: 'pack2', units: 2 },
                ],
                430,
                [
                    { id: 'pack5', quantity: 18, product: { id: 'pack5', units: 23 } },
                    { id: 'pack4', quantity: 1, product: { id: 'pack4', units: 11 } },
                    { id: 'pack3', quantity: 1, product: { id: 'pack3', units: 5 } },
                ],
            ],
            [[{ id: 'pack1', units: 4 }], 3, []],
            [
                [
                    { id: 'pack1', units: 1 },
                    { id: 'pack4', units: 11 },
                ],
                5,
                [{ id: 'pack1', quantity: 5, product: { id: 'pack1', units: 1 } }],
            ],
            [
                [
                    { id: 'pack1', units: 0 },
                    { id: 'pack2', units: 1 },
                ],
                5,
                [{ id: 'pack2', quantity: 5, product: { id: 'pack2', units: 1 } }],
            ],
        ] as [any[], number | undefined, any[]][]
    ).forEach(([products, requestedItems, expected]: [any[], number | undefined, any[]]) =>
        it(`${requestedItems}(${JSON.stringify(products)}) => ${JSON.stringify(expected)}`, () => {
            expect(requestItems(products, requestedItems)).toEqual(expected);
        }),
    );
});
