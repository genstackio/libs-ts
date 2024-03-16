import mapStep from './mapStep';
import { options, steps } from '../types';

export function buildStepsFromAlgos(algos: string, options: options): steps {
    algos = (algos || '').trim().replace(/[^a-z0-9]+/i, '');
    if (!algos) return [];
    return [...(algos.match(/[a-z0-9]{1,3}/gi) || [])].map((x: string) => mapStep(x, options));
}

export default buildStepsFromAlgos;
