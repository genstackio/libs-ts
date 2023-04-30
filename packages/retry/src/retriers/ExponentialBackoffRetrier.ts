import AbstractRetrier from "../AbstractRetrier";
import {retry_context} from "../types";

export class ExponentialBackoffRetrier<T = any> extends AbstractRetrier<T> {
    async call(fn: (context: retry_context) => Promise<T>, options?: Record<string, any>): Promise<T> {
        const timeframe = 100;
        const maxRetries = 6;
        let r: T|undefined = undefined;
        let retries = 0;
        let delay = 0;
        let e: any = undefined;
        let retry = true;
        const startTime = new Date().valueOf();
        do {
            delay = (Math.pow(2, retries) - 1) * timeframe;
            await this.wait(delay);
            r = undefined;
            e = undefined;
            try {
                r = await fn({retries, startTime, elapsedTime: new Date().valueOf() - startTime});
            } catch (err: any) {
                e = err
            }
            switch (await this.detectSituation(r, e)) {
                case 'success':
                    e = undefined;
                    retry = false;
                    break;
                case 'retriable_error':
                    retry = true;
                    break;
                case 'not_ready':
                    retry = true;
                    break;
                case 'throttled':
                    retry = true;
                    break;
                case 'empty_response':
                    retry = false;
                    break;
                case 'denied':
                    retry = false;
                    break;
                case 'malformed':
                    retry = false;
                    break;
                case 'not_found':
                    retry = false;
                    break;
                default:
                    retry = false;
                    break;
            }
            retries++;
        } while (retry && (retries < maxRetries));

        if (!!e) throw e;

        return r as unknown as T;
    }
    protected detectSituation(r: T|undefined, e: Error|undefined) {
        if (e) {
            const errorCode = e['code'] || undefined;
            if (!errorCode) return 'retriable_error';

            switch (errorCode) {
                case 400: return 'malformed';
                case 401: return 'denied';
                case 402: return 'denied';
                case 403: return 'denied';
                case 404: return 'not_found';
                case 405: return 'denied';
                case 406: return 'denied';
                case 407: return 'denied';
                case 408: return 'not_ready';
                case 409: return 'malformed';
                case 410: return 'not_ready';
                case 411: return 'malformed';
                case 412: return 'malformed';
                case 413: return 'malformed';
                case 414: return 'malformed';
                case 415: return 'malformed';
                case 416: return 'malformed';
                case 417: return 'malformed';
                case 421: return 'malformed';
                case 422: return 'malformed';
                case 423: return 'denied';
                case 424: return 'not_ready';
                case 425: return 'not_ready';
                case 426: return 'malformed';
                case 428: return 'malformed';
                case 429: return 'throttled';
                case 431: return 'malformed';
                case 451: return 'denied';
                case 500: return 'retriable_error';
                case 501: return 'denied';
                case 502: return 'not_ready';
                case 503: return 'not_ready';
                case 504: return 'not_ready';
                case 505: return 'malformed';
                case 506: return 'malformed';
                case 507: return 'not_ready';
                case 508: return 'malformed';
                case 511: return 'malformed';
                default: 'retriable_error';
            }
        }
        if (!r) return 'empty_response';

        return 'success';
    }
}

export default ExponentialBackoffRetrier;