import fetch from "node-fetch";
import { Endpoint } from "../endpoint";
import { cannotHaveBody } from "../http-method";

export interface CallOptions {
    query?: any;
    params?: any;
    body?: any;
}

export class NodeCaller {
    async call<T>(endpoint: Endpoint, options?: CallOptions): Promise<T> {
        const result = await fetch(this.resolveURL(endpoint, options), {
            method: endpoint.method,
            headers: this.resolveHeaders(endpoint, options),
            body: this.resolveBody(endpoint, options),
        });

        return ((await result.json()) as unknown) as T;
    }

    resolveURL(endpoint: Endpoint, options: CallOptions) {
        const url = this.resolveURLParameters(endpoint, options);

        return this.resolveQueryParameters(url, endpoint, options);
    }

    resolveHeaders(endpoint: Endpoint, options: CallOptions) {
        return {
            "Content-Type": "application/json",
        };
    }

    resolveBody(endpoint: Endpoint, options: CallOptions) {
        if (cannotHaveBody(endpoint.method)) {
            return null;
        }
        return JSON.stringify(
            endpoint.getBodyObject(options && options.body ? options.body : {})
        );
    }

    resolveURLParameters(endpoint: Endpoint, options: CallOptions) {
        return endpoint.getURLWithParameters(
            options && options.params ? options.params : {}
        );
    }

    resolveQueryParameters(
        url: string,
        endpoint: Endpoint,
        options: CallOptions
    ) {
        const queryString = endpoint.getQueryString(
            options && options.query ? options.query : {}
        );

        if (queryString) {
            return `${url}?${queryString}`;
        }
        return url;
    }
}
