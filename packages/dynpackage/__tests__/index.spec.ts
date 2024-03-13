import dynpackage from '../src/utils/dynpackage';
import AdmZip from 'adm-zip';

describe('dynpackage', function () {
    it('is a buffer that contain no entries by default', async () => {
        const b = await dynpackage([]);
        const zip = new AdmZip(b);
        expect(zip.getEntryCount()).toEqual(0);
        expect(b).toBeDefined();
    });
});
