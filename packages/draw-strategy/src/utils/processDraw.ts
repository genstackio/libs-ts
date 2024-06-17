import strategies from '../strategies';
import { bunch, draw, execute_fn, ticket } from '../types';

export async function processDraw(draw: draw, tickets: ticket[], bunches: bunch[], execute: execute_fn) {
    const strategy = draw?.strategy || undefined;
    const s = strategy ? strategies[strategy || 'default'] : strategies.default;

    if (!s) throw new Error(`Unknown draw strategy '${strategy}'`);

    return s(draw, tickets, bunches, execute);
}

export default processDraw;
