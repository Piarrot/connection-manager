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
    private endpoints: Endpoint[] = [];

    constructor(config: EndpointCollectionConfig) {
        this.name = config.name;
        this.protocol = config.protocol;
        this.baseURL = config.baseURL;
        for (const endpointConfig of config.endpoints) {
            this.endpoints.push(new Endpoint(endpointConfig, this));
        }
    }

    getName() {
        return this.name;
    }

    getURL() {
        return `${this.protocol}://${this.baseURL}`;
    }

    getEndpoint(namePathArray: string[]) {
        const endpoint = this.endpoints.find((endpoint) => {
            return endpoint.name == namePathArray[0];
        });
        if (!endpoint) return null;
        return endpoint;
    }
}
