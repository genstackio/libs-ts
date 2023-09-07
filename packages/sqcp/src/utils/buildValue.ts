import { clean } from '@genstackio/validator';

export function buildValue(type: string, raw: unknown) {
    const v = raw;
    switch (type) {
        case 'string':
            return String(raw);
        case 'integer':
            return String(parseInt(String(Number(raw))));
        case 'datetime':
            let d: Date | undefined;
            let vvv = 0;
            if (!v) return undefined;
            if ('number' === typeof v) {
                try {
                    d = new Date(Number(v));
                    vvv = d.valueOf();
                } catch (e: any) {
                    vvv = 0;
                }
            } else if ('string' === typeof v) {
                try {
                    d = new Date(String(v));
                    vvv = d.valueOf();
                } catch (e: any) {
                    vvv = 0;
                }
            } else {
                vvv = 0;
            }
            if (!vvv) return undefined;
            return new Date(Number(v)).toISOString();
        case 'email':
            return clean('email', v);
        case 'code':
            return clean('code', v);
        case 'country':
            return clean('country', v);
        case 'locale':
            return clean('locale', v);
        case 'rna':
            return clean('rna', v);
        case 'token':
            return clean('token', v);
        case 'uuid':
            return clean('uuid', v);
        case 'ipv4':
            return clean('ipv4', v);
        case 'phone':
            return clean('phone', v);
        case 'url':
            return clean('url', v);
        case 'arn':
            return clean('arn', v);
        case 'id':
            return clean('id', v);
        case 'publicToken':
            return clean('publicToken', v);
        case 'privateToken':
            return clean('privateToken', v);
        case 'compositeToken':
            return clean('compositeToken', v);
        case 'key':
            return clean('key', v);
        case 'image':
            if (!v) return undefined;
            if ('object' === typeof v && (v as any).url) {
                const vv = clean('url', (v as any).url);
                if (!vv) return undefined;
                return vv;
            }
            return undefined;
        default:
            return String(raw);
    }
}

export default buildValue;
