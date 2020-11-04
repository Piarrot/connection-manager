import { Endpoint } from "../src/endpoint";

test("creating an endpoint with incorrect method should throw", () => {
    expect(() => {
        new Endpoint({
            name: "an endpoint",
            url: "https://example.com",
            method: "frula",
        });
    }).toThrow();
});
