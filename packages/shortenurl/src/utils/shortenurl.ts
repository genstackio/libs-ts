export function shortenurl(url: unknown, domainOnly = false) {
    if (!url || 'string' !== typeof url) return undefined;
    url = url
        .replace(/^https?:\/\//i, '')
        .replace(/^www\./i, '')
        .replace(/\/$/, '');
    return domainOnly ? (url as string).split('/')[0] : url;
}

export default shortenurl;
