export class HttpSdkBaseResponseError extends Error {
    protected response: any;
    protected request: any;
    protected fetchedError: any | undefined;
    constructor(response: any, request: any) {
        super(HttpSdkBaseResponseError.buildMessage(response, request));
        this.response = response;
        this.request = request;
    }
    // noinspection JSUnusedLocalSymbols
    static buildMessage(response: any, request: any): string {
        return `Bad response from http api: ${response.status}`;
    }
    // noinspection JSUnusedGlobalSymbols
    async getErrorReason(): Promise<string | undefined> {
        await this.ensureErrorFetched();
        return this.fetchedError.error?.reason;
    }
    async ensureErrorFetched() {
        if (!!this.fetchedError) return;
        try {
            this.fetchedError = await this.getResponse().json();
        } catch (e: any) {
            // unable to retrieve error reason
        }
    }
    async getErrorRootCause(): Promise<string | undefined> {
        await this.ensureErrorFetched();
        return this.fetchedError.error?.reason;
    }
    async getErrorType(): Promise<string | undefined> {
        await this.ensureErrorFetched();
        return this.fetchedError.error?.type;
    }
    async getError(): Promise<any | undefined> {
        await this.ensureErrorFetched();
        return this.fetchedError.error;
    }
    async getStatus(): Promise<number | undefined> {
        await this.ensureErrorFetched();
        return this.fetchedError.status;
    }
    getResponse(): any {
        return this.response;
    }
    getRequest(): any {
        return this.request;
    }
}

// noinspection JSUnusedGlobalSymbols
export default HttpSdkBaseResponseError;
