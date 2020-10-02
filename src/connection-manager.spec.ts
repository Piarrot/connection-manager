import ConnectionManager from "./connection-manager";

test("getEndpointsByName", () => {
    const conM = new ConnectionManager();
    const endpointName = "GetProduct";
    const endpoint = conM.getEndpointByName(endpointName);
    expect(endpoint.name).toBe(endpointName);
    expect(endpoint.url).toBe("https://example.com/products/{id}");
});

test("getEndpoints", () => {
    const conM = new ConnectionManager();
    expect(Object.keys(conM.endpoints).length).toBe(2);
});
