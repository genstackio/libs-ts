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
        ] as [string, sqcp_data, string][]
    ).forEach(([mappingName, data, expected, withExtras = true]: [string, sqcp_data, string, boolean?]) =>
        it(`${JSON.stringify(expected)} => ${data}`, () => {
            expect(packSqcp(data, mappingName, withExtras)).toEqual(expected);
        }),
    );
});
