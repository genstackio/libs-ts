import { sqcp_mapping } from '../types';

const m: sqcp_mapping = {
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
};

export default m;
