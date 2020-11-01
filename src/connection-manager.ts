import fetch from "node-fetch";
import { NodeCaller } from "./callers/node-caller";
import { EndpointRegistry } from "./endpoint-registry";

export default class ConnectionManager {
    endpointRegistry: EndpointRegistry = new EndpointRegistry();

    constructor(private caller: NodeCaller = new NodeCaller()) {}

    async call<T>(endpointName: string): Promise<T> {
        const endpoint = this.endpointRegistry.getEndpointByName(endpointName);
        return await this.caller.call<T>(endpoint);
    }
}
