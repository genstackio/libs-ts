import { options } from '../types';

export function mapStep(code: string, options: options) {
    return !!options?.plugins?.[code] ? { type: code } : { type: 'unknown', code };
}

export default mapStep;
