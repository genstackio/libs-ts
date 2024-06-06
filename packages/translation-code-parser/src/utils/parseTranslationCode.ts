export function parseTranslationCode(code: string | undefined, domain?: string): [string, string | undefined, string] {
    const firstLetter = code?.slice(0, 1) || undefined;
    let v: string[] = [];

    switch (firstLetter) {
        case '/':
            v = code!.slice(1).split(/\//g);
            return [v[0], v[1], v[2]];
        case '.':
            return ['_', undefined, code!.slice(1)];
        case '@':
            v = code!.slice(1).split(/\//g);
            return ['__', v[0], v[1]];
        default:
            return ['translation', domain || 'translation', code || ''];
    }
}

// noinspection JSUnusedGlobalSymbols
export default parseTranslationCode;
