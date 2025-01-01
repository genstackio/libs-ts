import debug from 'debug';
import {
    fetch,
    sdk_config,
    request_listener,
    response_listener,
    fetch_with_request,
    request_authorization_provider,
    Request,
} from './types';
import HttpSdkBaseResponseError from './HttpSdkBaseResponseError';

const debugHttpSdkBase = debug('http-sdk-base');
const debugHttpSdkBaseHttp = debug('http-sdk-base:http');

export abstract class BaseSdk {
    private readonly endpoint: string;
    private readonly fetch: fetch;
    private readonly requestListeners: request_listener[];
    private readonly responseListeners: response_listener[];
    private authorizationProvider: undefined | request_authorization_provider;
    constructor({ endpoint, fetch, authorizationProvider, requestListeners = [], responseListeners = [] }: sdk_config) {
        this.endpoint = endpoint;
        this.requestListeners = [...requestListeners];
        this.responseListeners = [...responseListeners];
        this.fetch = fetch;
        authorizationProvider && this.setAuthorizationProvider(authorizationProvider);
        debugHttpSdkBase('instantiate %j', this);
    }
    addRequestListener(listener: request_listener) {
        this.requestListeners.push(listener);
        return this;
    }
    addResponseListener(listener: response_listener) {
        this.responseListeners.push(listener);
        return this;
    }
    setAuthorizationProvider(provider: request_authorization_provider) {
        if (!!this.authorizationProvider) throw new Error(`Authorization provider already set`);
        this.authorizationProvider = provider;
        return this.addRequestListener(this.createRequestListenerFromAuthorizationProvider(provider));
    }
    protected createRequestListenerFromAuthorizationProvider(provider: request_authorization_provider) {
        return async (request: Request): Promise<void> => {
            const value: any = await provider(request);
            if (!value) return;
            const headers: Record<string, string> = {};
            if ('string' === typeof value) headers['Authorization'] = value;
            else (Object.assign as Function)(headers, value as any);
            Object.entries(headers).forEach(([k, v]) => request.headers.set(k, v));
        };
    }
    async http<T = unknown, U = unknown>(
        uri = '/',
        method = 'GET',
        body: T | undefined = undefined,
        headers: Record<string, string> | undefined = {},
    ) {
        const url = `${this.endpoint}${uri}`;
        const initOptions = {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                ...headers,
            },
            body: body ? ('string' === typeof body ? body : JSON.stringify(body)) : undefined,
        };
        const request = new Request(url, initOptions);
        await this.requestListeners.reduce(async (acc, r) => {
            await acc;
            return r(request);
        }, Promise.resolve());
        debugHttpSdkBaseHttp('request %j', { url, initOptions });
        const response = await (this.fetch as fetch_with_request)(request);
        await this.responseListeners.reduce(async (acc, r) => {
            await acc;
            return r(response);
        }, Promise.resolve());
        debugHttpSdkBaseHttp('response %j', response);
        if (!response.ok) {
            throw new HttpSdkBaseResponseError(response, request);
        }
        const r = await response.json();
        debugHttpSdkBaseHttp('result %j', r);
        return r as U;
    }
}

export default BaseSdk;
