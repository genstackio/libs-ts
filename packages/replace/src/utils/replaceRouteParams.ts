export function replaceRouteParams(a: string, params: any) {
    return a.replace(/(:[a-z0-9_]+)/gi, (match, p1) => (params || {})[(p1 || '').slice(1)]);
}

export default replaceRouteParams;
