import { EndpointRegistry } from "../src/endpoint-registry";

let endpointRegistry: EndpointRegistry;

beforeEach(() => {
    endpointRegistry = new EndpointRegistry();
});

test("given a wrong endpoint name, should fail", () => {
    const endpointName = "Products.getAll";
    const endpoint = endpointRegistry.getEndpointByName(endpointName);
    expect(endpoint).toBe(null);
});

test("getEndpointsByName", () => {
    const endpointName = "Products.GetProduct";
    const endpoint = endpointRegistry.getEndpointByName(endpointName);
    expect(endpoint.name).toBe(endpointName);
    expect(endpoint.url).toBe("https://example.com/products/{id}");
});
