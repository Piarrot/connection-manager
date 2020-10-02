import * as path from "path";
import * as fs from "fs";

export default class ConnectionManager {
    endpoints: any = {};

    constructor() {
        this.getEndpointsFromConfig();
    }

    getEndpointByName(endpointName: string) {
        const endpoint = this.endpoints[endpointName];
        if (!endpoint) return null;
        return { name: endpointName, url: `${endpoint.url}` };
    }

    private getEndpointsFromConfig() {
        const collections: Array<any> = JSON.parse(
            fs.readFileSync(path.join(__dirname, "endpoints.json")).toString()
        );

        for (let i = 0; i < collections.length; i++) {
            const col = collections[i];
            col.endpoints.forEach((endpoint: any) => {
                endpoint.url = `${col.protocol}://${col.baseURL}${endpoint.url}`;
                this.endpoints[endpoint.name] = endpoint;
            });
        }

        return collections;
    }
}
