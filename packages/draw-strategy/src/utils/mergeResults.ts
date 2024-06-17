import { result } from '../types';

export function mergeResults(results: result[]): result {
    return results.reduce(
        (acc: result, r: result) => {
            return {
                ...acc,
                id: r.id,
                createdAt: r.createdAt,
                winners: [...acc.winners, ...r.winners],
            };
        },
        { id: '', createdAt: 0, winners: [] } as result,
    );
}

export default mergeResults;
