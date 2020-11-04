import { applyOptions } from "../lib/apply-options";
import { NodeCaller } from "./callers/node-caller";
import { EndpointCollectionConfig } from "./endpoint-collection";
import { EndpointRegistry } from "./endpoint-registry";

export interface ConnectionManagerConfig {
    caller?: NodeCaller;
    endpoints?: any;
}

export default class ConnectionManager {
    endpointRegistry: EndpointRegistry = new EndpointRegistry();
    private caller: NodeCaller = new NodeCaller();

    constructor(config?: ConnectionManagerConfig) {
        applyOptions(this, config, {
            customParsers: {
                endpoints: (value: EndpointCollectionConfig[]) => {
                    this.endpointRegistry.loadEndpoints(value);
                },
            },
        });
    }

    async call<T>(endpointName: string): Promise<T> {
        const endpoint = this.endpointRegistry.getEndpointByName(endpointName);
        return await this.caller.call<T>(endpoint);
    }
}
