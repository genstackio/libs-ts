import {
    currency as defaultDefaultCurrency,
    currency2LocaleMap as localeFromCurrencies,
    locale as defaultDefaultLocale,
} from '@genstackio/defaults';
import toLanguageTagLocale from '@genstackio/locale/lib/utils/toLanguageTagLocale';

export function formatAmount(
    amount: number | undefined,
    currency: string | undefined,
    maxDigits?: number,
    locale?: string,
    { defaultCurrency = defaultDefaultCurrency }: { defaultCurrency?: string } = {},
) {
    const realLocale = toLanguageTagLocale(
        locale ||
            localeFromCurrencies[currency || ''] ||
            localeFromCurrencies[defaultCurrency || ''] ||
            localeFromCurrencies[defaultDefaultCurrency || ''] ||
            defaultDefaultLocale,
    );
    return new Intl.NumberFormat(realLocale, {
        style: 'currency',
        currency: currency || defaultCurrency || defaultDefaultCurrency,
        maximumFractionDigits: String(amount).indexOf('.') > -1 ? maxDigits : 0,
    }).format(amount || 0);
}

export default formatAmount;
