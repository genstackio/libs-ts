import { clean } from '@genstackio/validator';

export function unbuildValue(type: string, v: string) {
    v = decodeURIComponent(v);
    switch (type) {
        case 'string':
            return String(v);
        case 'integer':
            return parseInt(v);
        case 'datetime':
            let d: Date | undefined;
            let vvv = 0;
            v = v.trim();
            if (!v) return undefined;
            if (/^[0-9]+$/.test(v)) {
                try {
                    d = new Date(Number(v));
                    vvv = d.valueOf();
                } catch (e: any) {
                    vvv = 0;
                }
            } else {
                try {
                    d = new Date(String(v));
                    vvv = d.valueOf();
                } catch (e: any) {
                    vvv = 0;
                }
            }
            if (!vvv) return undefined;
            return new Date(vvv).valueOf();
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
            const vv = clean('url', v);
            if (!vv) return undefined;
            return { url: vv };
        default:
            return String(v);
    }
}

export default unbuildValue;
