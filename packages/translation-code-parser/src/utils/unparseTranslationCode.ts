export function unparseTranslationCode(
    infos: [string, string | undefined, string],
): { code: string; domain?: string } | undefined {
    switch (infos?.[0]) {
        case '_':
            return infos?.[2] ? { code: `.${infos[2]}`, domain: undefined } : undefined;
        case '__':
            return infos?.[1] && infos?.[2] ? { code: `@${infos[1]}/${infos[2]}`, domain: undefined } : undefined;
        default:
            return infos?.[2]
                ? { code: `/${infos[0] || 'unknown'}/${infos[1] || 'unknown'}/${infos[2]}`, domain: undefined }
                : undefined;
    }
}

// noinspection JSUnusedGlobalSymbols
export default unparseTranslationCode;
