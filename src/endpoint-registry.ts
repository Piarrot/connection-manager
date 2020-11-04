import objectPath from "object-path";

import {
    EndpointCollection,
    EndpointCollectionConfig,
} from "./endpoint-collection";
import { Endpoint } from "./endpoint";

export class EndpointRegistry {
    endpoints: Map<string, EndpointCollection> = new Map<
        string,
        EndpointCollection
    >();

    constructor() {}

    getEndpointByName(endpointPath: string): Endpoint {
        const endpointPathArray = endpointPath.split(".");
        const collection = this.endpoints.get(endpointPathArray[0]);
        if (!collection) return null;
        return collection.getEndpoint(endpointPathArray.slice(1));
    }

    loadEndpoints(endpointsConfig: EndpointCollectionConfig[]) {
        for (const endpointColOpt of endpointsConfig) {
            this.endpoints.set(
                endpointColOpt.name,
                new EndpointCollection(endpointColOpt)
            );
        }
    }
}
