export function shortenurl(url: unknown) {
    if (!url || 'string' !== typeof url) return undefined;
    return url
        .replace(/^https?:\/\//i, '')
        .replace(/^www\./i, '')
        .replace(/\/$/, '');
}

export default shortenurl;
