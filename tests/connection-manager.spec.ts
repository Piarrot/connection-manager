import ConnectionManager from "../src/connection-manager";
import { TestDTO } from "./models/test-dto";
import endpoints from "./data/endpoints.json";
import { startDummyServer } from "./callers/express-dummy-server";
import { Server } from "http";

let connectionManager: ConnectionManager;
let server: Server;
let port: number;
beforeAll(async () => {
    let result = await startDummyServer();
    server = result.server;
    port = result.port;
});

afterEach(async () => {
    server.close();
});

test("given a correct endpoint name, makes a call and works", async () => {
    connectionManager = new ConnectionManager({
        endpoints,
    });
    const endpointName = "TestCollection.TestGet";
    const data = await connectionManager.call<TestDTO>(endpointName);
    expect(data.method).toBe("GET");
});

test("given an incorrect endpoint name, trying to make a call should throw", async () => {
    connectionManager = new ConnectionManager({
        endpoints,
    });
    const endpointName = "TestCollection.WrongEndpoint";
    await expect(
        connectionManager.call<TestDTO>(endpointName)
    ).rejects.toThrow();
});
