import { EndpointConfig, Endpoint } from "./endpoint";

type ConnectionProtocol = "http" | "https";

export interface EndpointCollectionConfig {
    name: string;
    protocol: string;
    baseURL: string;
    endpoints: EndpointConfig[];
}

export class EndpointCollection {
    private name: string;
    private protocol: string;
    private baseURL: string;
    private endpoints: Map<string, Endpoint> = new Map<string, Endpoint>();

    constructor(config: EndpointCollectionConfig) {
        this.name = config.name;
        this.protocol = config.protocol;
        this.baseURL = config.baseURL;
        for (const endpointConfig of config.endpoints) {
            this.assertUniqueEndpointName(endpointConfig.name);
            this.endpoints.set(
                endpointConfig.name,
                new Endpoint(endpointConfig, this)
            );
        }
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
