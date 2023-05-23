import retry from '../src/index';

describe('retry', () => {
    it('retry', async () => {
        const p = retry(async (x) => {
            const { retries } = x;
            switch (retries) {
                case 0:
                    throw new Error('first error');
                case 1:
                    throw new Error('second error');
                case 2:
                    throw new Error('third error');
                default:
                    return 42;
            }
        });

        await expect(p).resolves.toEqual(42);
    });
});
