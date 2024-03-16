import { options } from '../types';

export function marshall(data: string, _: any, options: options) {
    if (!options?.helpers?.['x3j']) throw new Error('Unsupported x3j helper');
    const h = options.helpers['x3j'];
    return h(data);
}
export function unmarshall(data: string, _: any, options: options) {
    if (!options?.helpers?.['j3x']) throw new Error('Unsupported j3x helper');
    const h = options.helpers['j3x'];
    return h(data);
}
