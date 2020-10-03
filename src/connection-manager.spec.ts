import ConnectionManager from "./connection-manager";
import { TestDTO } from "./test-tdo";
const connectionManager = new ConnectionManager();

test("getEndpointsByName", () => {
    const endpointName = "Products.GetProduct";
    const endpoint = connectionManager.getEndpointByName(endpointName);
    expect(endpoint.name).toBe(endpointName);
    expect(endpoint.url).toBe("https://example.com/products/{id}");
});

test("given a wrong endpoint name, should fail", () => {
    const endpointName = "Products.getAll";
    const endpoint = connectionManager.getEndpointByName(endpointName);
    expect(endpoint).toBe(null);
});

test("given a correct endpoint make a call and works", async () => {
    const endpointName = "RickAndMorty.getMorty";
    const data = await connectionManager.call<TestDTO>(endpointName);
    expect(data.name).toBe("Morty Smith");
});
