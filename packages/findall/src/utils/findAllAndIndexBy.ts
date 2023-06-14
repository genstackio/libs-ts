export async function findAllAndIndexBy<T = any, U = T>(field: string, fetcher: Function, mapper?: (x: T, index: number) => U) {
    let cursor: any = undefined;
    const items: Record<string, T> = {};
    do {
        const page = await fetcher(cursor);
        cursor = page.cursor;
        page.items?.reduce((acc, item, index: number) => {
            acc[item[field] || ''] = mapper ? mapper(item, index) : item;
            return acc;
        }, items);
    } while (!!cursor);
    return items;
}

// noinspection JSUnusedGlobalSymbols
export default findAllAndIndexBy;