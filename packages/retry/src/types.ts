export type retry_context = {
    retries: number;
    startTime: number;
    elapsedTime: number;
};

export type retry_fn<T = any> = (context: retry_context) => Promise<T>;

export type retry_options = { mode?: string; retriers?: Record<string, IRetrier>; [key: string]: any };

export interface IRetrier<T = any> {
    call(fn: (context: retry_context) => Promise<T>, options?: Record<string, any>): Promise<T>;
}
