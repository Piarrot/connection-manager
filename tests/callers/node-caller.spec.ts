import Endpoint from "../../src/endpoint";
import { NodeCaller } from "../../src/callers/node-caller";
import { TestDTO } from "../test-dto";

let caller: NodeCaller;
beforeEach(() => {
    caller = new NodeCaller();
});

test("Calling a wrong endpoint should throw", async () => {
    const endpoint: Endpoint = {
        url: "http://example-not-found.com",
        method: "post",
        name: "pruebafallida",
    };

    await expect(caller.call(endpoint)).rejects.toThrow();
});

test("Calling a correct endpoint should work", async () => {
    const endpoint: Endpoint = {
        url: "https://rickandmortyapi.com/api/character/2",
        method: "get",
        name: "pruebaExitosa",
    };

    const result = await caller.call<TestDTO>(endpoint);
    expect(result.name).toBe("Morty Smith");
});
