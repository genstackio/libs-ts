export async function findAllAndIndexBy<T = any>(field: string, fetcher: Function) {
    let cursor: any = undefined;
    const items: Record<string, T> = {};
    do {
        const page = await fetcher(cursor);
        cursor = page.cursor;
        page.items?.reduce((acc, item) => {
            acc[item[field] || ''] = item;
            return acc;
        }, items);
    } while (!!cursor);
    return items;
}

// noinspection JSUnusedGlobalSymbols
export default findAllAndIndexBy;