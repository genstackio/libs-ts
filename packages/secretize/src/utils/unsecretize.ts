import pipeline from './pipeline';
import { options } from '../types';

export function unsecretize(data: string, algos: string, options: options) {
    return pipeline(data, algos, 'unmarshall', true, options);
}

// noinspection JSUnusedGlobalSymbols
export default unsecretize;
