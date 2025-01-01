import { fetch, request_authorization_provider, request_listener, response_listener } from './types';
import { Sdk } from './Sdk';

export * from './Sdk';
export * from './types';
// noinspection JSUnusedGlobalSymbols
export const createSdk = (
    endpoint: string,
    localFetch: fetch | undefined = undefined,
    authorizationProvider?: request_authorization_provider,
    requestListeners: request_listener[] = [],
    responseListeners: response_listener[] = [],
) => {
    const globalFetch = require('cross-fetch');
    const fetch = localFetch || globalFetch;
    if (!fetch) throw new Error(`No fetch function available`);
    return new Sdk({
        endpoint,
        fetch: fetch as any,
        authorizationProvider,
        requestListeners,
        responseListeners,
    });
};
export * from './HttpSdkBaseResponseError';
export { default as default } from './Sdk';
