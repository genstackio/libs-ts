import { retry_context, IRetrier } from './types';

export abstract class AbstractRetrier<T = any> implements IRetrier<T> {
    abstract call(fn: (context: retry_context) => Promise<T>): Promise<T>;
    async wait(delay: number) {
        if (!delay) return;
        return new Promise((resolve) => {
            setTimeout(() => resolve(undefined), delay);
        });
    }
}

export default AbstractRetrier;
