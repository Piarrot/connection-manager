import { Endpoint } from "../../src/endpoint";
import { NodeCaller } from "../../src/callers/node-caller";
import { TestDTO } from "../models/test-dto";
import { startDummyServer } from "./express-dummy-server";
import { Server } from "http";

const HOST = "http://localhost";
let PORT = 3000;

let caller: NodeCaller;
let expressServer: Server;

beforeAll(async () => {
    let result = await startDummyServer();
    expressServer = result.server;
    PORT = result.port;
});

beforeEach(async () => {
    caller = new NodeCaller();
});

afterAll(() => {
    expressServer.close();
});

function getHost() {
    return `${HOST}:${PORT}`;
}

test("Calling a wrong endpoint should throw", async () => {
    const endpoint: Endpoint = new Endpoint({
        url: `${getHost()}/url-no-existente`,
        method: "post",
        name: "pruebafallida",
    });

    await expect(caller.call(endpoint)).rejects.toThrow();
});

test("Calling a correct endpoint with GET method should work", async () => {
    const endpoint: Endpoint = new Endpoint({
        url: `${getHost()}/`,
        method: "get",
        name: "pruebaExitosa",
    });

    const result = await caller.call<TestDTO>(endpoint);
    expect(result.method).toBe("GET");
});

test("Calling a correct endpoint with POST method should work", async () => {
    const endpoint: Endpoint = new Endpoint({
        url: `${getHost()}/`,
        method: "post",
        name: "pruebaExitosa",
    });

    const result = await caller.call<TestDTO>(endpoint);
    expect(result.method).toBe("POST");
});

test("Calling a correct endpoint with PUT method should work", async () => {
    const endpoint: Endpoint = new Endpoint({
        url: `${getHost()}/`,
        method: "PUT",
        name: "pruebaExitosa",
    });

    const result = await caller.call<TestDTO>(endpoint);
    expect(result.method).toBe("PUT");
});

test("Calling a correct endpoint with PATCH method should work", async () => {
    const endpoint: Endpoint = new Endpoint({
        url: `${getHost()}/`,
        method: "PATCH",
        name: "pruebaExitosa",
    });

    const result = await caller.call<TestDTO>(endpoint);
    expect(result.method).toBe("PATCH");
});

test("Calling a correct endpoint with DELETE method should work", async () => {
    const endpoint: Endpoint = new Endpoint({
        url: `${getHost()}/`,
        method: "DELETE",
        name: "pruebaExitosa",
    });

    const result = await caller.call<TestDTO>(endpoint);
    expect(result.method).toBe("DELETE");
});
