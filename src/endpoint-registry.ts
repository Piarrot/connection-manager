import * as path from "path";
import * as fs from "fs";
import objectPath from "object-path";

import EndpointCollection from "./endpoint-collection";
import Endpoint from "./endpoint";

export class EndpointRegistry {
    endpoints: any = {};

    constructor() {
        this.getEndpointsFromConfig();
    }

    getEndpointByName(endpointName: string): Endpoint {
        const endpoint = objectPath.get(this.endpoints, endpointName);
        if (!endpoint) return null;
        return { ...endpoint, name: endpointName };
    }

    private getEndpointsFromConfig() {
        const collections: Array<EndpointCollection> = this.parseEndpointsConfig();
        this.endpoints = this.processEndpointsFromCollections(collections);
        return collections;
    }

    private parseEndpointsConfig() {
        return JSON.parse(
            fs.readFileSync(path.join(__dirname, "endpoints.json")).toString()
        );
    }

    private processEndpointsFromCollections(
        collections: EndpointCollection[]
    ): any {
        const collectionMap: any = {};
        for (let i = 0; i < collections.length; i++) {
            const col = collections[i];
            const endpointMap: any = {};
            col.endpoints.forEach((endpoint) => {
                endpoint.url = `${col.protocol}://${col.baseURL}${endpoint.url}`;
                endpointMap[endpoint.name] = endpoint;
            });
            collectionMap[col.name] = endpointMap;
        }
        return collectionMap;
    }
}
