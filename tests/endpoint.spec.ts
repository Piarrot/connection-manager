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

test("creating an endpoint with correct method should work", () => {
    expect(
        new Endpoint({
            name: "an endpoint",
            url: "https://example.com",
            method: "post",
        })
    ).toBeDefined();
});

test("creating an endpoint with correct method, but in caps, should work", () => {
    expect(
        new Endpoint({
            name: "an endpoint",
            url: "https://example.com",
            method: "POST",
        })
    ).toBeDefined();
});
