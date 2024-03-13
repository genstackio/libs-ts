import AdmZip from 'adm-zip';
import { dynpackage_entries } from '../types';

export async function dynpackage(entries: dynpackage_entries,{ output }: { output?: string } = {}) {
    const zip = new AdmZip();

    // @todo
    //zip.addFile('test.txt', Buffer.from('the content here', 'utf8'));

    const buffer = zip.toBuffer();

    !!output && zip.writeZip(output);

    return buffer;
}

export default dynpackage;
