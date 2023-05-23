import formatAmount from './formatAmount';

export function formatRawAmount(
    amount: number | undefined,
    currency: string | undefined,
    maxDigits?: number,
    locale?: string,
    options: { defaultCurrency?: string } = {},
) {
    return formatAmount(undefined !== amount ? amount / 100 : undefined, currency, maxDigits, locale, options);
}

// noinspection JSUnusedGlobalSymbols
export default formatRawAmount;
