import dynpackage from '../src/utils/dynpackage';
import AdmZip from 'adm-zip';

describe('dynpackage', function () {
    it('is a buffer that contain no entries by default', async () => {
        const b = await dynpackage([]);
        const zip = new AdmZip(b);
        expect(zip.getEntryCount()).toEqual(0);
        expect(b).toBeDefined();
    });

    it('is a buffer that contain 2 entries by default', async () => {
        const b = await dynpackage([
            ['first', async () => Buffer.from('first test file', 'utf-8')],
            ['second', async () => Buffer.from('second test file', 'utf-8')],
        ]);
        const zip = new AdmZip(b);
        expect(zip.getEntryCount()).toEqual(2);
        expect(b).toBeDefined();
    });
});
