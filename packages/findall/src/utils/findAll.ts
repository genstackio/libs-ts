export async function findAll<T = any>(fetcher: Function) {
    let cursor: any = undefined;
    let items: T[] = [];
    do {
        const page = await fetcher(cursor);
        cursor = page.cursor;
        items = [...items, ...page.items];
    } while (!!cursor);
    return items;
}

export default findAll;