import { Readable, Writable } from 'stream';

export type renderer<T = unknown, U = unknown> = (_: T) => Promise<U>;

export type uploaded_return = (stream: Readable, size: number, name: string, contentType: string) => Promise<unknown>;
export type uploaded_redirect = (stream: Readable, size: number, name: string, contentType: string) => Promise<resp>;

export type resp = {
    status?: number;
    headers?: Record<string, string>;
    body?: string | Buffer;
};

export type response = Writable & {
    status: (number) => response;
    json: (unknown) => void;
    setHeader: (name: string, value: string) => void;
    send: (data: unknown) => void;
    end: () => void;
};

export type request = {
    params: Record<string, unknown>;
    query: Record<string, unknown>;
};
