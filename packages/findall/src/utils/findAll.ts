export async function findAll<T = any, U = T>(fetcher: Function, mapper?: (x: T) => U, maxPages: number = 100000) {
    let cursor: any = undefined;
    let items: U[] = [];
    let n = 0;
    do {
        const page = await fetcher(cursor);
        cursor = page.cursor;
        items = [...items, ...(mapper ? (page?.items || []).map(mapper! as any) : (page?.items || []))];
        n++;
    } while (!!cursor && (n < maxPages))

    return items;
}

export default findAll;