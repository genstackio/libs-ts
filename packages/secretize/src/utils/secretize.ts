import pipeline from './pipeline';
import { options } from '../types';

export function secretize(data: string, algos: string, options: options) {
    return pipeline(data, algos, 'marshall', false, options);
}

// noinspection JSUnusedGlobalSymbols
export default secretize;
