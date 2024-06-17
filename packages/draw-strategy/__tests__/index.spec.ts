import processDraw, { result_winner, simple_bunch, draw, ticket } from '../src';

const execute = async (_: draw, tickets: ticket[], bunches: simple_bunch[]) => {
    const newTickets = [...tickets];
    return {
        id: '',
        createdAt: 0,
        winners: bunches.reduce((acc, b) => {
            for (let i = 0; i < (b.nb || 1); i++) {
                if (newTickets.length) {
                    const tt = newTickets.shift();
                    tt && acc.push({ t: tt.id, b: b.id });
                }
            }
            return acc;
        }, [] as result_winner[]),
    };
};

describe('processDraw(random)', function () {
    it('no tickets no bunches return empty result', async () => {
        await expect(processDraw({}, [], [], execute)).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('no tickets but bunches return empty result', async () => {
        await expect(processDraw({}, [], [{ id: 'a', quantity: 1 }], execute)).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('one ticket one bunch return non-empty result', async () => {
        await expect(processDraw({}, [{ id: 't1' }], [{ id: 'b1', quantity: 1 }], execute)).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [{ t: 't1', b: 'b1' }],
        });
    });
    it('two tickets one bunch return non-empty result', async () => {
        await expect(
            processDraw({}, [{ id: 'tA' }, { id: 'tB' }], [{ id: 'bA', quantity: 1 }], execute),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [{ t: 'tA', b: 'bA' }],
        });
    });
});

describe('processDraw(applied_random)', function () {
    it('no tickets no bunches return empty result', async () => {
        await expect(processDraw({ strategy: 'applied_random' }, [], [], execute)).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('no tickets but bunches return empty result', async () => {
        await expect(
            processDraw({ strategy: 'applied_random' }, [], [{ id: 'a', quantity: 1 }], execute),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('one ticket one bunch but ticket not applied return empty result', async () => {
        await expect(
            processDraw({ strategy: 'applied_random' }, [{ id: 't1' }], [{ id: 'b1', quantity: 1 }], execute),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('one ticket one bunch and ticket applied but not for this bunch return empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_random' },
                [{ id: 't1', appliedBunches: ['b2'] }],
                [{ id: 'b1', quantity: 1 }],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('one ticket one bunch and ticket applied for this bunch return non-empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_random' },
                [{ id: 't1', appliedBunches: ['b1'] }],
                [{ id: 'b1', quantity: 1 }],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [{ t: 't1', b: 'b1' }],
        });
    });
    it('two tickets one bunch return non-empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_random' },
                [{ id: 'tA' }, { id: 'tB', appliedBunches: ['bA'] }],
                [{ id: 'bA', quantity: 1 }],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [{ t: 'tB', b: 'bA' }],
        });
    });
});

describe('processDraw(applied_or_noapplications_random)', function () {
    it('no tickets no bunches return empty result', async () => {
        await expect(processDraw({ strategy: 'applied_or_noapplications_random' }, [], [], execute)).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('no tickets but bunches return empty result', async () => {
        await expect(
            processDraw({ strategy: 'applied_or_noapplications_random' }, [], [{ id: 'a', quantity: 1 }], execute),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('one ticket one bunch but ticket not applied return empty result', async () => {
        await expect(
            processDraw({ strategy: 'applied_or_noapplications_random' }, [{ id: 't1' }], [], execute),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('one ticket one bunch and ticket applied but not for this bunch return empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_or_noapplications_random' },
                [{ id: 't1', appliedBunches: ['b2'] }],
                [{ id: 'b1', quantity: 1 }],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [],
        });
    });
    it('one ticket one bunch and ticket applied for this bunch return non-empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_or_noapplications_random' },
                [{ id: 't1', appliedBunches: ['b1'] }],
                [{ id: 'b1', quantity: 1 }],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [{ t: 't1', b: 'b1' }],
        });
    });
    it('two tickets one bunch return non-empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_or_noapplications_random' },
                [{ id: 'tA' }, { id: 'tB', appliedBunches: ['bA'] }],
                [{ id: 'bA', quantity: 1 }],
                async () => ({ id: '', createdAt: 0, winners: [{ t: 'tA', b: 'bA' }] }),
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [{ t: 'tA', b: 'bA' }],
        });
    });
    it('two tickets two bunch return non-empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_or_noapplications_random' },
                [
                    { id: 'tA', appliedBunches: ['bB'] },
                    { id: 'tB', appliedBunches: ['bA'] },
                ],
                [
                    { id: 'bA', quantity: 1 },
                    { id: 'bB', quantity: 1 },
                ],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [
                { t: 'tB', b: 'bA' },
                { t: 'tA', b: 'bB' },
            ],
        });
    });
    it('two tickets not applied two bunch return non-empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_or_noapplications_random' },
                [{ id: 'tA' }, { id: 'tB' }],
                [
                    { id: 'bA', quantity: 1 },
                    { id: 'bB', quantity: 1 },
                ],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [
                { t: 'tA', b: 'bA' },
                { t: 'tB', b: 'bB' },
            ],
        });
    });
    it('two tickets not applied two bunch return non-empty result', async () => {
        await expect(
            processDraw(
                { strategy: 'applied_or_noapplications_random' },
                [{ id: 'tA' }, { id: 'tB' }],
                [{ id: 'bA', quantity: 2 }],
                execute,
            ),
        ).resolves.toEqual({
            id: '',
            createdAt: 0,
            winners: [
                { t: 'tA', b: 'bA' },
                { t: 'tB', b: 'bA' },
            ],
        });
    });
});
