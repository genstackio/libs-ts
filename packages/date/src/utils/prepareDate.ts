export function prepareDate(date: Date | string | number | undefined | unknown) {
    if (!date) return new Date();
    if ('string' === typeof date) return new Date(date);
    if ('number' === typeof date) return new Date(date);
    if (date instanceof Date) return date;
    throw new Error(`Unsupported date: ${date}`);
}

export default prepareDate;
