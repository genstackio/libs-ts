import { locale as defaultDefaultLocale } from '@genstackio/defaults';
import toLanguageTagLocale from '@genstackio/locale/lib/utils/toLanguageTagLocale';
import prepareDate from './prepareDate';

export function formatDate(
    date: Date | string | number | undefined,
    locale?: string,
    format?: string,
    { defaultLocale = defaultDefaultLocale }: { defaultLocale?: string } = {},
) {
    return new Intl.DateTimeFormat(toLanguageTagLocale(locale || defaultLocale), {}).format(prepareDate(date));
}

export default formatDate;
