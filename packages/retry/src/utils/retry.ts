import { retry_fn, retry_options } from '../types';
import DefaultRetrier from '../retriers/DefaultRetrier';
import ExponentialBackoffRetrier from '../retriers/ExponentialBackoffRetrier';

export async function retry(fn: retry_fn, { retriers, mode = 'default', ...options }: retry_options = {}) {
    retriers = {
        default: new DefaultRetrier(),
        exponentional_backoff: new ExponentialBackoffRetrier(),
        ...(retriers || {}),
    };

    const retrier = retriers[mode || ''] || retriers['default'];

    if (!retrier) throw new Error(`Unknown retrier '${mode || 'default'}'`);

    return retrier!.call(fn, options);
}
// noinspection JSUnusedGlobalSymbols
export default retry;
