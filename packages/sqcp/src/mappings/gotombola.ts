import { sqcp_mapping } from '../types';
import identity from './standard';
import utm from './standard';
import owner from './owner';

const m: sqcp_mapping = {
    ...identity,
    ...utm,
    ...owner,
    tenant: { key: 't', type: 'string' },
    paymentMean: { key: 'p', type: 'string' },
    quantity: { key: 'q', type: 'integer' },
    donation: { key: 'd', type: 'integer' },
    custom: { key: 'cd', type: 'string' },
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
