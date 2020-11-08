import { EndpointCollection } from "./endpoint-collection";
import { HTTPMethod, parseHTTPMethod } from "./http-method";
import { applyOptions } from "../lib/apply-options";
import {
    isValidFullURL,
    isValidFullURLWithParams,
    isValidURLFragment,
} from "../lib/string-utils";
import qs from "qs";

export interface EndpointConfig {
    method: string;
    name: string;
    url: string;
    urlParameters?: any;
    queryParameters?: any;
}

export class Endpoint {
    private _name: string;
    public get name() {
        return this._name;
    }
    private url: string;
    private _method: HTTPMethod;
    public get method(): HTTPMethod {
        return this._method;
    }
    private urlParameters: any;

    private queryParameters: any;

    private defaultBody: {};

    private parent: EndpointCollection;

    constructor(config: EndpointConfig, parent?: EndpointCollection) {
        this.parent = parent;

        applyOptions(this, config, {
            customParsers: {
                name: this.processAndAssertIsValidName,
                url: this.processAndAssertIsValidURL,
                method: (value: string) => {
                    this._method = parseHTTPMethod(value);
                },
            },
        });
    }

    getFullName() {
        if (!this.parent) return this.name;
        return `${this.parent.getName()}.${this.name}`;
    }

    getURL() {
        if (!this.parent) return this.url;
        return `${this.parent.getURL()}${this.url}`;
    }

    getBodyObject(body: any) {
        return applyOptions({}, body, {
            defaultOptions: this.defaultBody,
        });
    }

    getURLWithParameters(params: any) {
        const allParams = applyOptions({}, params, {
            defaultOptions: this.urlParameters,
        });

        const originalURL = this.getURL();

        let finalURL = originalURL;

        for (const key in allParams) {
            const param = allParams[key];
            if (originalURL.indexOf(`:${key}`) == -1) {
                throw Error(`Key ${key} not found in url: ${originalURL}`);
            }
            finalURL = finalURL.replace(`:${key}`, param);
        }

        return finalURL;
    }

    getQueryString(query: any) {
        const allQueryParams = applyOptions({}, query, {
            defaultOptions: this.queryParameters,
        });
        return qs.stringify(allQueryParams);
    }

    private processAndAssertIsValidURL(url: string) {
        url = url.toLowerCase();
        url = url.trim();
        if (this.parent && !isValidURLFragment(url)) {
            throw Error(`Invalid url: ${url} `);
        }
        if (!this.parent && !isValidFullURLWithParams(url)) {
            throw Error(`Invalid url': ${url} `);
        }
        this.url = url;
    }

    private processAndAssertIsValidName(name: string) {
        this._name = name.toLowerCase().trim();
        if (this._name.includes(" ")) {
            throw Error(
                `Endpoint should not have spaces in their names: ${name}`
            );
        }
    }
}
