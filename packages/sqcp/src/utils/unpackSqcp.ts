import { sqcp_data } from '../types';
import mappings from '../mappings';

function unpackSqcp(qs: string | undefined, mappingName = 'standard', withExtras = true) {
    // noinspection SuspiciousTypeOfGuard
    if (!qs || 'string' !== typeof qs) return {};

    if (!mappings[mappingName]) throw new Error(`Unknown mapping '${mappingName}'`);

    const m = mappings[mappingName];

    const im = Object.entries(m).reduce((acc, [k, { key, ...v }]) => {
        acc[key] = { ...v, name: k };
        return acc;
    }, {} as Record<string, { name: string; type: string }>);

    const [data, _] = qs.split(/&/g).reduce(
        (acc, part) => {
            const p = part.indexOf('=');
            let v = '';
            let k: string = part;
            if (-1 < p) {
                k = part.slice(0, p);
                v = part.slice(p + 1);
            }
            const x = im[k];
            if (!x) {
                if (withExtras) {
                    acc[0][k] = v;
                } else {
                    acc[1][k] = v;
                }
            } else {
                acc[0][x.name] = unbuildValue(x.type, v);
            }
            return acc;
        },
        [{} as sqcp_data, {} as Record<string, unknown>],
    );

    /*
    const zz = Object.entries(extras);

    if (zz.length) {
        zz.sort((a, b) => (a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0));

        data['extras'] = JSON.stringify(
            zz.reduce((acc, [k, v]) => {
                acc[k] = v;
                return acc;
            }, {} as Record<string, unknown>),
        );
    }
     */

    return data;
}

function unbuildValue(type: string, v: string) {
    v = decodeURIComponent(v);
    switch (type) {
        case 'string':
            return String(v);
        case 'integer':
            return parseInt(v);
        default:
            return String(v);
    }
}
export default unpackSqcp;
