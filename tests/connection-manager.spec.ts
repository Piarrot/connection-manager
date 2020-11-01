import ConnectionManager from "../src/connection-manager";
import { TestDTO } from "./test-dto";
let connectionManager: ConnectionManager;

beforeEach(() => {
    connectionManager = new ConnectionManager();
});

test("given a correct endpoint make a call and works", async () => {
    const endpointName = "RickAndMorty.getMorty";
    const data = await connectionManager.call<TestDTO>(endpointName);
    expect(data.name).toBe("Morty Smith");
});
