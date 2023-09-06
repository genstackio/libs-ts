import { sqcp_data } from '../types';
import mappings from '../mappings';

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
            acc[def.key] = buildValue(def.type, b);
            return acc;
        }, {} as Record<string, string>),
    ).map(([k, v]) => {
        return `${k}=${encodeURIComponent(v)}`;
    }, [] as string[]);

    parts.sort();

    return parts.join('&');
}

function buildValue(type: string, raw: unknown) {
    switch (type) {
        case 'string':
            return String(raw);
        case 'integer':
            return String(parseInt(String(Number(raw))));
        default:
            return String(raw);
    }
}
export default packSqcp;
