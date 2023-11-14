import selectContextSwitch from './selectContextSwitch';

export function objectSwitch(next: any, context: any, replaceVars?: Function, exists?: Function): string | undefined {
    if ('function' === typeof next) return objectSwitch(next(context), context, replaceVars, exists);
    if ('object' === typeof next) return objectSwitch(selectContextSwitch(next, context), context, replaceVars, exists);

    if (!next) return undefined;
    if ('string' === typeof next) next = [next];
    if (!Array.isArray(next) || !next?.length) return undefined;

    return next
        .map((aa: string) => (replaceVars ? replaceVars(aa, context) : aa))
        .find((exists as any) || ((_: any, __: number) => true));
}

export default objectSwitch;
