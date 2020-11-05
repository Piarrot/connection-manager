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

    loadEndpoints(endpointsConfig: EndpointCollectionConfig[]) {
        for (const endpointColOpt of endpointsConfig) {
            const collection = new EndpointCollection(endpointColOpt);
            this.assertUniqueCollectionName(collection.name);
            this.endpoints.set(collection.name, collection);
        }
    }

    getEndpointByName(endpointPath: string): Endpoint {
        const { collectionName, endpointName } = this.processEndpointPath(
            endpointPath
        );
        const collection = this.endpoints.get(collectionName);
        if (!collection)
            throw Error(`Collection '${collectionName}' not found`);
        return collection.getEndpoint(endpointName);
    }

    private processEndpointPath(endpointPath: string) {
        const endpointPathArray = endpointPath.toLowerCase().split(".");
        this.assertEndpointPathSize(endpointPathArray);
        return {
            collectionName: endpointPathArray[0],
            endpointName: endpointPathArray[1],
        };
    }

    private assertEndpointPathSize(endpointPathArray: string[]) {
        if (endpointPathArray.length > 2) {
            throw Error(
                `Path '${endpointPathArray.toString()}' with too many nodes`
            );
        }
        if (endpointPathArray.length < 2) {
            throw Error(
                `Path '${endpointPathArray.toString()}' has too few nodes`
            );
        }
    }

    private assertUniqueCollectionName(name: string) {
        if (this.endpoints.has(name)) {
            throw Error(`Collection "${name}" is duplicated`);
        }
    }
}
