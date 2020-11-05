import { EndpointCollection } from "./endpoint-collection";
import { HTTPMethod, parseHTTPMethod } from "./http-method";
import { applyOptions } from "../lib/apply-options";

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

    private parent: EndpointCollection;

    constructor(config: EndpointConfig, parent?: EndpointCollection) {
        this.parent = parent;

        applyOptions(this, config, {
            customParsers: {
                name: "_name",
                method: (value) => {
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
}
