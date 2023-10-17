export function parseRange(range: string, firstIndex = 1) {
    range = (range || '').trim().replace(/[^0-9\-,]+/g, '');

    if (!range) return [];

    return Object.keys(
        range.split(/,/g).reduce((acc, range) => {
            if (!range) return acc;
            if (-1 === range.indexOf('-')) {
                parseInt(range) < firstIndex && (range = firstIndex as any);
                Object.assign(acc, { [String(range)]: true });
                return acc;
            }
            const [start, end] = range.split('-');
            let iEnd = parseInt(end);
            let iStart = parseInt(start);
            // noinspection JSComparisonWithNaN
            isNaN(iStart) && (iStart = firstIndex);
            isNaN(iEnd) && (iEnd = firstIndex);
            if (iEnd < firstIndex) iEnd = firstIndex;
            if (iStart < firstIndex) iStart = firstIndex;
            if (iEnd < iStart) {
                const v = iEnd;
                iEnd = iStart;
                iStart = v;
            }
            if (iEnd === iStart) {
                Object.assign(acc, { [String(iEnd)]: true });
                return acc;
            }
            const xx = Array.from({ length: iEnd - iStart + 1 }, (_, index) => index + iStart);
            return xx.reduce((acc2, xxx) => Object.assign(acc2, { [String(xxx)]: true }), acc);
        }, {} as Record<string, true>),
    )
        .map((x) => parseInt(x))
        .sort((a: number, b: number) => (a < b ? -1 : b < a ? 1 : 0));
}

export default parseRange;
