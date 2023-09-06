import { sqcp_mapping } from '../types';
import identity from './standard';
import utm from './standard';

const m: sqcp_mapping = {
    ...identity,
    ...utm,
    tenant: { key: 't', type: 'string' },
    paymentMean: { key: 'p', type: 'string' },
    quantity: { key: 'q', type: 'integer' },
    donation: { key: 'd', type: 'integer' },
    custom: { key: 'cd', type: 'string' },
    owner: { key: 'o', type: 'string' },
    ownerEmail: { key: 'oe', type: 'string' },
    ownerPhone: { key: 'op', type: 'string' },
    ownerLastName: { key: 'ol', type: 'string' },
    ownerFirstName: { key: 'of', type: 'string' },
    ownerExternalId: { key: 'oid', type: 'string' },
    ownerCountry: { key: 'oco', type: 'string' },
    ownerCity: { key: 'oci', type: 'string' },
    ownerZipCode: { key: 'ozc', type: 'string' },
    ownerExternalOrganizationName: { key: 'oor', type: 'string' },
    ownerBirthdate: { key: 'obd', type: 'string' },
    ownerTable: { key: 'ota', type: 'string' },
    ownerGroup: { key: 'ogr', type: 'string' },
    ownerAge: { key: 'oag', type: 'string' },
    customSeller: { key: 'sc', type: 'string' },
    mode: { key: 'm', type: 'string' },
    locale: { key: 'l', type: 'string' },
    game: { key: 'g', type: 'string' },
    sellergroup: { key: 'sg', type: 'string' },
    seller: { key: 's', type: 'string' },
    pack: { key: 'pk', type: 'string' },
    godfather: { key: 'z', type: 'string' },
    project: { key: 'pr', type: 'string' },
    beneficiary: { key: 'b', type: 'string' },
    country: { key: 'c', type: 'string' },
    book: { key: 'k', type: 'string' },
    bookPublicToken: { key: 'kpt', type: 'string' },
    requestedTicketCustomCodes: { key: 'cc', type: 'string' },
};

export default m;
