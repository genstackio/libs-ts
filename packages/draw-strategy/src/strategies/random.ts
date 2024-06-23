import { bunch, draw, execute_fn, result, ticket } from '../types';

/**
 * Random strategy
 *
 * This strategy take all the tickets, all the bunches and mix it in order to have max 1 ticket per bunch and
 * max 1 bunch per ticket.
 */
export default async function (draw: draw, tickets: ticket[], bunches: bunch[], execute: execute_fn): Promise<result> {
    return execute(
        draw,
        tickets.map((x: ticket) => ({ id: x.id })),
        bunches.map((x: bunch) => ({ id: x.id, nb: x.quantity, ...(x.rankOffset ? { ro: x.rankOffset } : {}) })),
    );
}
