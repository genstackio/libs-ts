import { options, step } from '../types';

export function applyStep(data: string, step: step, operation: string, options: options) {
    const s = options?.plugins?.[step.type];
    if (!s) throw new Error(`Unknown plugin type '${step.type}'`);
    if (!s?.[operation]) throw new Error(`Unknown operation '${operation}' for plugin '${step.type}'`);
    return s[operation](data, step, options);
}

export default applyStep;
