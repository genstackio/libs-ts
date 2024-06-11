import getTranslator from './getTranslator';

export async function translate(text: string, locale: string, sourceLocale = 'en_US') {
    sourceLocale = (sourceLocale || '').replace('_', '-');
    const targetLocale = (locale || '').replace('_', '-');
    if (sourceLocale === targetLocale) return text;

    return getTranslator().translateText(text, sourceLocale, targetLocale, {
        deepl: {
            authKey: process.env.DEEPL_AUTH_KEY,
            serverUrl: process.env.DEEPL_SERVER_URL,
        },
    });
}

export default translate;
