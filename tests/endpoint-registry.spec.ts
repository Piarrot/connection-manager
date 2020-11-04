import { EndpointRegistry } from "../src/endpoint-registry";
import endpoints from "./data/endpoints.json";

let endpointRegistry: EndpointRegistry;

beforeEach(() => {
    endpointRegistry = new EndpointRegistry();
});

test("given a wrong endpoint name but correct collection name, when requesting the endpoint, should return null", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "Products.wrongname";
    const endpoint = endpointRegistry.getEndpointByName(endpointName);
    expect(endpoint).toBe(null);
});

test("given a wrong endpoint name and collection name, when requesting the endpoint, should return null", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "frula.wrongname";
    const endpoint = endpointRegistry.getEndpointByName(endpointName);
    expect(endpoint).toBe(null);
});

test("given a correct endpoit name, when requesting an endpoint, should return endpoint", () => {
    endpointRegistry.loadEndpoints(endpoints);
    const endpointName = "Products.GetProduct";
    const endpoint = endpointRegistry.getEndpointByName(endpointName);
    expect(endpoint.getFullName()).toBe(endpointName);
    expect(endpoint.getURL()).toBe("https://example.com/products/{id}");
});
