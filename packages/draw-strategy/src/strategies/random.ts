import { bunch, draw, execute_fn, result, ticket, ticket_mapper_fn, bunch_mapper_fn } from '../types';

/**
 * Random strategy
 *
 * This strategy take all the tickets, all the bunches and mix it in order to have max 1 ticket per bunch and
 * max 1 bunch per ticket.
 */
export default async function (
    draw: draw,
    tickets: ticket[],
    bunches: bunch[],
    execute: execute_fn,
    ticketMapper?: ticket_mapper_fn,
    bunchMapper?: bunch_mapper_fn,
): Promise<result> {
    return execute(
        draw,
        tickets.map((x: ticket) => {
            const z = { id: x.id };
            return ticketMapper ? ticketMapper(z, x) : z;
        }),
        bunches.map((x: bunch) => {
            const z = { id: x.id, nb: x.quantity, ...(x.rankOffset ? { ro: x.rankOffset } : {}) };
            return bunchMapper ? bunchMapper(z, x) : z;
        }),
    );
}
