import replaceFn from './replaceFn';
import valuePath from './valuePath';

export function replaceVars(pattern, data = {}, startTagPattern = '\\{\\{', endTagPattern = '\\}\\}') {
    pattern = replaceFn(
        pattern,
        (x: string) => (x.slice(0, 12) === 'process.env.' ? process.env[x.slice(12)] : undefined) || '',
        '\\[\\[',
        '\\]\\]',
    );

    return replaceFn(
        pattern,
        (k) => {
            const v = valuePath(k, data);
            if (undefined === v) return '';
            return v;
        },
        startTagPattern,
        endTagPattern,
    );
}

export default replaceVars;
