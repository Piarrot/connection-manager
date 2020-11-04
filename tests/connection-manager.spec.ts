import ConnectionManager from "../src/connection-manager";
import { TestDTO } from "./models/test-dto";
import endpoints from "./data/endpoints.json";

let connectionManager: ConnectionManager;

test("given a correct endpoint make a call and works", async () => {
    connectionManager = new ConnectionManager({
        endpoints,
    });
    const endpointName = "RickAndMorty.getMorty";
    const data = await connectionManager.call<TestDTO>(endpointName);
    expect(data.name).toBe("Morty Smith");
});
