import AdmZip from 'adm-zip';
import { dynpackage_entries } from '../types';
import { chunkize } from '@ohoareau/array';

export async function dynpackage(entries: dynpackage_entries, { output }: { output?: string } = {}) {
    const zip = new AdmZip();

    await chunkize(entries, 20).reduce(async (acc, chunk) => {
        await acc;
        return await Promise.allSettled(chunk.map(async (item) => zip.addFile(item[0], await item[1]())));
    }, Promise.resolve([]) as Promise<any[]>);

    const buffer = zip.toBuffer();

    !!output && zip.writeZip(output);

    return buffer;
}

export default dynpackage;
