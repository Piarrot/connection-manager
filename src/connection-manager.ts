import { NodeCaller } from "./callers/node-caller";
import { EndpointRegistry } from "./endpoint-registry";

export interface ConnectionManagerConfig {
    caller?: NodeCaller;
    endpoints?: any;
}

export default class ConnectionManager {
    endpointRegistry: EndpointRegistry = new EndpointRegistry();
    private caller: NodeCaller = new NodeCaller();

    constructor(config?: ConnectionManagerConfig) {
        if (config) {
            this.loadConfig(config);
        }
    }

    private loadConfig(config: ConnectionManagerConfig) {
        if (config.caller) {
            this.caller = config.caller;
        }
        if (config.endpoints) {
            this.endpointRegistry.loadEndpoints(config.endpoints);
        }
    }

    async call<T>(endpointName: string): Promise<T> {
        const endpoint = this.endpointRegistry.getEndpointByName(endpointName);
        return await this.caller.call<T>(endpoint);
    }
}
