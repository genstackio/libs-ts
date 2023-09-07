import { sqcp_data } from '../types';
import mappings from '../mappings';
import buildValue from './buildValue';

function packSqcp(d: sqcp_data | undefined, mappingName = 'standard', withExtras = true) {
    if (!d) return '';

    if (!mappings[mappingName]) throw new Error(`Unknown mapping '${mappingName}'`);

    const m = mappings[mappingName];

    const parts = Object.entries(
        Object.entries(d).reduce((acc, [a, b]) => {
            if (!m[a]) {
                withExtras && (acc[a] = String(b));
                return acc;
            }
            const def = m[a];
            const vv = buildValue(def.type, b);
            if (undefined !== vv) {
                acc[def.key] = vv;
            }
            return acc;
        }, {} as Record<string, string>),
    ).map(([k, v]) => {
        return `${k}=${encodeURIComponent(v)}`;
    }, [] as string[]);

    parts.sort();

    return parts.join('&');
}

export default packSqcp;
