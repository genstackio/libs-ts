import { Readable, Writable } from 'stream';

export type response_mode = 'return' | 'redirect' | 'locate';

export type renderer<T = unknown, U = unknown> = (_: T) => Promise<U>;
export type descriptor = (req: request) => {
    contentType: string;
    extension: string;
    name: string;
    responseMode: response_mode;
};

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

export type result = {
    length: number;
    stream: Readable;
    contentType: string;
    extraHeaders?: { name: string; value: string }[];
};
