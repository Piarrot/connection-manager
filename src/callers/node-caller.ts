import fetch from "node-fetch";

import { Endpoint } from "../endpoint";

export class NodeCaller {
    async call<T>(endpoint: Endpoint): Promise<T> {
        const result = await fetch(endpoint.getURL(), {
            method: endpoint.method,
        });
        return ((await result.json()) as unknown) as T;
    }
}
