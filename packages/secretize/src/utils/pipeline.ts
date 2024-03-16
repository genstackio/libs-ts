import { options } from '../types';
import applyStep from './applyStep';
import buildStepsFromAlgos from './buildStepsFromAlgos';
import * as plugins from '../plugins';

export function pipeline(data: string, algos: string, operation: string, reverse: boolean, options: options) {
    const localOptions = { ...options, plugins: { ...(options?.plugins || {}), ...plugins } };
    const steps = buildStepsFromAlgos(algos, localOptions);
    if (!steps?.length) return '';
    reverse && steps.reverse();
    return steps.reduce((acc, step) => applyStep(acc, step, operation, localOptions), data);
}

// noinspection JSUnusedGlobalSymbols
export default pipeline;
