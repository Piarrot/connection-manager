import { applyOptions } from "../lib/apply-options";
import { EndpointConfig, Endpoint } from "./endpoint";
import { isValidBaseURL } from "../lib/string-utils";

export interface EndpointCollectionConfig {
    name: string;
    baseURL: string;
    endpoints: EndpointConfig[];
}

export class EndpointCollection {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    private baseURL: string;
    private endpoints: Map<string, Endpoint> = new Map<string, Endpoint>();

    constructor(config: EndpointCollectionConfig) {
        applyOptions(this, config, {
            customParsers: {
                name: this.processAndAssertIsValidName,
                baseURL: this.processAndAssertIsValidBaseURL,
                endpoints: this.processAndAssertValidEndpoints,
            },
        });
    }

    getName() {
        return this.name;
    }

    getURL() {
        return `${this.baseURL}`;
    }

    getEndpoint(endpointName: string) {
        const endpoint = this.endpoints.get(endpointName);
        if (!endpoint)
            throw Error(
                `Endpoint "${endpointName}" in collection "${this.name}" not found`
            );
        return endpoint;
    }

    private processAndAssertIsValidName(name: string) {
        name = name.toLowerCase();
        name = name.trim();
        if (name.includes(" ")) {
            throw Error(
                `Endpoints and Collections should not have spaces in their names: ${name}`
            );
        }
        this._name = name;
    }

    private processAndAssertIsValidBaseURL(value: string) {
        this.baseURL = value.toLowerCase().trim();

        if (!isValidBaseURL(this.baseURL)) {
            throw Error(`Invalid base url: ${this.baseURL}`);
        }

        if (this.baseURL.endsWith("/")) {
            this.baseURL = this.baseURL.substring(0, this.baseURL.length - 1);
        }
    }

    private processAndAssertValidEndpoints(endpoints: EndpointConfig[]) {
        for (const endpointConfig of endpoints) {
            const endpoint = new Endpoint(endpointConfig, this);
            this.assertIsUniqueEndpointName(endpoint.name);
            this.endpoints.set(endpoint.name, endpoint);
        }
    }

    private assertIsUniqueEndpointName(name: string) {
        if (this.endpoints.has(name)) {
            throw Error(`Endpoint "${name}" is duplicated`);
        }
    }
}
