import { EndpointRegistry } from "../src/endpoint-registry";
import endpoints from "./data/endpoints.json";

let endpointRegistry: EndpointRegistry;

beforeEach(() => {
    endpointRegistry = new EndpointRegistry();
});

test("given a wrong endpoint name but correct collection name, when requesting the endpoint, should throw", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "TestCollection.wrongname";
    expect(() => {
        endpointRegistry.getEndpointByName(endpointName);
    }).toThrow();
});

test("given a wrong endpoint name and collection name, when requesting the endpoint, should throw", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "frula.wrongname";
    expect(() => {
        endpointRegistry.getEndpointByName(endpointName);
    }).toThrow();
});

test("given a path too long, when requesting the endpoint, should throw", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "TestCollection.TestGet.Extrapart";
    expect(() => {
        endpointRegistry.getEndpointByName(endpointName);
    }).toThrow();
});

test("given two collections with the same name, should throw", () => {
    expect(() => {
        endpointRegistry.loadEndpoints([
            {
                name: "TestCollection",
                protocol: "http",
                baseURL: "localhost:3000",
                endpoints: [
                    {
                        method: "get",
                        name: "TestGet",
                        url: "/",
                    },
                ],
            },
            {
                name: "TestCollection",
                protocol: "http",
                baseURL: "localhost:3000",
                endpoints: [
                    {
                        method: "get",
                        name: "TestGet",
                        url: "/",
                    },
                ],
            },
        ]);
    }).toThrow();
});

test("given two endpoints with the same name in the same collection, should throw", () => {
    expect(() => {
        endpointRegistry.loadEndpoints([
            {
                name: "TestCollection",
                protocol: "http",
                baseURL: "localhost:3000",
                endpoints: [
                    {
                        method: "get",
                        name: "TestGet",
                        url: "/",
                    },
                    {
                        method: "get",
                        name: "TestGet",
                        url: "/",
                    },
                ],
            },
        ]);
    }).toThrow();
});

test("given a correct endpoint name, when requesting an endpoint, should return endpoint", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "TestCollection.TestGet";
    const endpoint = endpointRegistry.getEndpointByName(endpointName);
    expect(endpoint.getFullName()).toBe(endpointName.toLowerCase());
    expect(endpoint.getURL()).toBe("http://localhost:3000/");
});

test("when requesting an endpoint, given a correct endpoint name but incorrect case, should return endpoint", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "TestCollection.TestGET";
    const endpoint = endpointRegistry.getEndpointByName(endpointName);
    expect(endpoint.getFullName()).toBe(endpointName.toLowerCase());
    expect(endpoint.getURL()).toBe("http://localhost:3000/");
});
