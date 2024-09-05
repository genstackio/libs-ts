import { sqcp_data } from '../src/types';
import unpackSqcp from '../src/utils/unpackSqcp';
import packSqcp from '../src/utils/packSqcp';

describe('unpackSqcp', function () {
    (
        [
            ['gotombola', '', {}],
            ['gotombola', 'o=abcd', { owner: 'abcd' }],
            ['gotombola', 'o=abcd&bla=bli', { owner: 'abcd', bla: 'bli' }],
            ['gotombola', 'o=abcd&bla=bli', { owner: 'abcd' }, false],
            [
                'gotombola',
                'lim=https://mycompany.com/my/logo.png',
                { logoImage: { url: 'https://mycompany.com/my/logo.png' } },
                false,
            ],
            [
                'gotombola',
                'psat=12345&oe=abcd&e=xyz@email.com',
                { plannedStartedAt: 12345, email: 'xyz@email.com' },
                false,
            ],
            [
                'gotombola',
                'o=abcd&of=Olivier&ol=Brown',
                { owner: 'abcd', ownerFirstName: 'Olivier', ownerLastName: 'Brown' },
            ],
            [
                'gotombola',
                'o=abcd&of=Laurent Olivier&ol=Brown',
                { owner: 'abcd', ownerFirstName: 'Laurent Olivier', ownerLastName: 'Brown' },
            ],
            [
                'gotombola',
                'o=abcd&of=Laurent%20Olivier&ol=Brown',
                { owner: 'abcd', ownerFirstName: 'Laurent Olivier', ownerLastName: 'Brown' },
            ],
            ['gotombola', 'o=abcd&tgc=GABC123', { owner: 'abcd', templateGameCode: 'GABC123' }],
            [
                'gotombola',
                'o=abcd&tgc=GABC123&tgp=abcdefg',
                { owner: 'abcd', templateGameProperties: 'abcdefg', templateGameCode: 'GABC123' },
            ],
        ] as [string, string, sqcp_data, boolean?][]
    ).forEach(([mappingName, raw, expected, withExtras = true]: [string, string, sqcp_data, boolean?]) =>
        it(`${raw} => ${JSON.stringify(expected)}`, () => {
            expect(unpackSqcp(raw, mappingName, withExtras)).toEqual(expected);
        }),
    );
});
describe('packSqcp', function () {
    (
        [
            ['gotombola', {}, ''],
            ['gotombola', { owner: 'abcd' }, 'o=abcd'],
            ['gotombola', { owner: 'abcd', bli: 'Bla' }, 'bli=Bla&o=abcd'],
            ['gotombola', { owner: 'abcd', bli: 'Bla' }, 'o=abcd', false],
            ['gotombola', { owner: 'abcd', ownerLastName: 'MacBrown' }, 'o=abcd&ol=MacBrown'],
            ['gotombola', { ownerEmail: 'abcd' }, ''],
            ['gotombola', { ownerEmail: 'abcd@email.com' }, 'oe=abcd%40email.com'],
            ['gotombola', { plannedStartedAt: 12345 }, 'psat=1970-01-01T00%3A00%3A12.345Z'],
            [
                'gotombola',
                { owner: 'abcd', ownerLastName: 'MacBrown', ownerFirstName: 'Phil' },
                'o=abcd&of=Phil&ol=MacBrown',
            ],
            [
                'gotombola',
                { owner: 'abcd', ownerLastName: 'MacBrown', ownerFirstName: 'Everett Phil' },
                'o=abcd&of=Everett%20Phil&ol=MacBrown',
            ],
            [
                'gotombola',
                { owner: 'abcd', ownerLastName: 'MacBrown', ownerFirstName: 'Everett Phil', bla: 'Bli' },
                'bla=Bli&o=abcd&of=Everett%20Phil&ol=MacBrown',
            ],
            ['gotombola', { owner: 'abcd', templateGameCode: 'GXYZ987' }, 'o=abcd&tgc=GXYZ987'],
            ['gotombola', { owner: 'abcd', templateGame: 'a1234' }, 'o=abcd&tg=a1234'],
            [
                'gotombola',
                { owner: 'abcd', templateGameProperties: 'pourz', templateGame: 'a1234' },
                'o=abcd&tg=a1234&tgp=pourz',
            ],
        ] as [string, sqcp_data, string][]
    ).forEach(([mappingName, data, expected, withExtras = true]: [string, sqcp_data, string, boolean?]) =>
        it(`${JSON.stringify(data)} => ${expected}`, () => {
            expect(packSqcp(data, mappingName, withExtras)).toEqual(expected);
        }),
    );
});
