import fetch from 'node-fetch';
import replaceVars from '@genstackio/replace/lib/utils/replaceVars';

// noinspection JSUnusedLocalSymbols
function buildApiUrlFromDef(def: any, { id, code }: { id: string; code: string }): string {
    const envVarName = `API_${(def.api || '').toUpperCase()}_ENDPOINT`;
    const envVarValue = process.env[envVarName] || undefined;
    if (!envVarValue) throw new Error(`Not Found (no api endpoint)`);
    const uri = `${(def.apiUri || '').replace('{{id}}', id)}` || undefined;
    if (!uri) throw new Error(`Not Found (no api uri)`);

    return `${envVarValue}${uri}`;
}

function buildS3PathFromDocAndDef(doc: any, def: any): string {
    const bucket = replaceVars(def.bucket, doc);
    const key = replaceVars(def.key, doc);

    return `s3://${bucket}/${key}`;
}

function buildFieldPathFromDocAndDef(doc: any, def: any): string {
    const tokens = def.field.split(/\./g);
    const v = tokens.reduce((acc, k) => (!acc ? undefined : acc[k]), doc);
    return `json://${def.fileName}/${!!v ? JSON.stringify(v) : 'undefined'}`;
}
export async function getTypeDownloadableAttributeSourceDsn(
    type: string,
    code: string,
    id: string,
    types: Record<string, Record<string, any>>,
) {
    const def = (types[type] || {})[code || ''] || undefined;
    if (!def) throw new Error(`Not Found (unknown code '${code}')`);

    const url = buildApiUrlFromDef(def, { id, code });
    if (!url) throw new Error(`Not Found (unable to build url)`);

    const r = await fetch(url);
    if (200 !== r.status) {
        throw new Error(`Not Found (bad response from api: ${r.status}, url: ${url})`);
    }
    const doc = await r.json();

    if (def.bucket) {
        return buildS3PathFromDocAndDef(doc, def);
    }
    if (def.field) {
        return buildFieldPathFromDocAndDef(doc, def);
    }

    if (def?.url) {
        const u = replaceVars(def?.url, doc);
        const buffer = await (await fetch(u)).arrayBuffer();

        // noinspection JSUnusedLocalSymbols
        return (options: any) => ({
            input: Buffer.from(buffer),
            fileName: u,
        });
    }

    return undefined;
}

// noinspection JSUnusedGlobalSymbols
export default getTypeDownloadableAttributeSourceDsn;
