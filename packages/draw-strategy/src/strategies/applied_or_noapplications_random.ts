import mergeResults from '../utils/mergeResults';
import { bunch, bunch_mapper_fn, draw, execute_fn, result, ticket, ticket_mapper_fn } from '../types';

/**
 * Applied or no applications Random strategy
 *
 * For each bunch (and its quantity), this strategy take all the tickets that have explicitly applied for this bunch,
 * and all the tickets that have not applied for any bunch, and ignore the others that have explictly applied for other
 * bunches, to mix this subset in order to have max 1 ticket per applied bunch and
 * max 1 applied bunch per ticket.
 */
export default async function (
    draw: draw,
    tickets: ticket[],
    bunches: bunch[],
    execute: execute_fn,
    ticketMapper?: ticket_mapper_fn,
    bunchMapper?: bunch_mapper_fn,
): Promise<result> {
    const { applications, noApplications } = tickets.reduce(
        (acc, t) => {
            if (!t?.appliedBunches?.length) {
                acc.noApplications.push(t);
                return acc;
            }
            t.appliedBunches.reduce((acc2, b) => {
                acc2[b] = acc2[b] || [];
                acc2[b].push(t);
                return acc2;
            }, acc.applications);
            return acc;
        },
        { noApplications: [], applications: {} } as {
            noApplications: ticket[];
            applications: Record<string, ticket[]>;
        },
    );

    const { results } = await bunches.reduce(async (acc, b: bunch) => {
        const localAcc = await acc;
        const bb = { id: b.id, nb: b.quantity, ...(b.rankOffset ? { ro: b.rankOffset } : {}) };
        const r = await execute(
            draw,
            [...(applications[b.id || ''] || []), ...noApplications]
                .map((x: ticket) => {
                    const z = { id: x.id };
                    return ticketMapper ? ticketMapper(z, x) : z;
                })
                .filter((x) => !localAcc.winningTickets[x.id]),
            [bunchMapper ? bunchMapper(bb, b) : bb],
        );
        return {
            winningTickets: {
                ...localAcc.winningTickets,
                ...(r?.winners?.reduce(
                    (acc2, x) => Object.assign(acc2, { [x.t]: true }),
                    {} as Record<string, boolean>,
                ) || {}),
            },
            results: [...localAcc.results, r],
        };
    }, Promise.resolve({ winningTickets: {}, results: [] } as { winningTickets: Record<string, boolean>; results: result[] }));

    return mergeResults(results);
}
