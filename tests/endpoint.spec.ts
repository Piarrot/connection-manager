import { Endpoint } from "../src/endpoint";
import { EndpointCollection } from "../src/endpoint-collection";

test("creating an endpoint with incorrect name should throw", () => {
    expect(() => {
        new Endpoint({
            name: "an endpoint",
            url: "https://example.com",
            method: "get",
        });
    }).toThrow();
});

test("creating an endpoint with incorrect method should throw", () => {
    expect(() => {
        new Endpoint({
            name: "anEndpoint",
            url: "https://example.com",
            method: "frula",
        });
    }).toThrow();
});

test("creating an endpoint with correct method should work", () => {
    expect(
        new Endpoint({
            name: "anEndpoint",
            url: "https://example.com",
            method: "post",
        })
    ).toBeDefined();
});

test("creating an endpoint with correct method, but in caps, should work", () => {
    expect(
        new Endpoint({
            name: "anEndpoint",
            url: "https://example.com",
            method: "POST",
        })
    ).toBeDefined();
});

test("endpoint should start with 'http[s]://' on their url when they don't have a parent collection", () => {
    expect(() => {
        new Endpoint({
            name: "anEndpoint",
            method: "get",
            url: "test",
        });
    }).toThrow();
});

test("endpoint should start with '/' on their url when they have a parent collection", () => {
    expect(() => {
        new EndpointCollection({
            name: "aCollection",
            baseURL: "http://localhost:3000",
            endpoints: [
                {
                    name: "anEndpoint",
                    method: "get",
                    url: "test",
                },
            ],
        });
    }).toThrow();
});
