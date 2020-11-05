import { applyOptions } from "../lib/apply-options";
import { EndpointConfig, Endpoint } from "./endpoint";

type ConnectionProtocol = "http" | "https";

export interface EndpointCollectionConfig {
    name: string;
    protocol: string;
    baseURL: string;
    endpoints: EndpointConfig[];
}

export class EndpointCollection {
    private _name: string;
    public get name(): string {
        return this._name;
    }
    private protocol: string;
    private baseURL: string;
    private endpoints: Map<string, Endpoint> = new Map<string, Endpoint>();

    constructor(config: EndpointCollectionConfig) {
        applyOptions(this, config, {
            customParsers: {
                name: (value: string) => {
                    this._name = value.toLowerCase();
                },
                endpoints: (endpoints: EndpointConfig[]) => {
                    for (const endpointConfig of endpoints) {
                        const endpoint = new Endpoint(endpointConfig, this);
                        this.assertUniqueEndpointName(endpoint.name);
                        this.endpoints.set(endpoint.name, endpoint);
                    }
                },
            },
        });
    }

    getName() {
        return this.name;
    }

    getURL() {
        return `${this.protocol}://${this.baseURL}`;
    }

    getEndpoint(endpointName: string) {
        const endpoint = this.endpoints.get(endpointName);
        if (!endpoint)
            throw Error(
                `Endpoint "${endpointName}" in collection "${this.name}" not found`
            );
        return endpoint;
    }

    assertUniqueEndpointName(name: string) {
        if (this.endpoints.has(name)) {
            throw Error(`Endpoint "${name}" is duplicated`);
        }
    }
}
