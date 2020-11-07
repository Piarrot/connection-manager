import { EndpointCollection } from "../src/endpoint-collection";

test("endpoint collection urls should be case insensitive", () => {
    const collection = new EndpointCollection({
        name: "aCollection",
        baseURL: "HTTP://LOCALHOST:3000",
        endpoints: [
            {
                name: "anEndpoint",
                method: "get",
                url: "/test",
            },
        ],
    });

    expect(collection.getURL()).toBe("http://localhost:3000");
});

test("endpoint collection names should be case insensitive", () => {
    const collection = new EndpointCollection({
        name: "aCollection",
        baseURL: "http://localhost:3000",
        endpoints: [
            {
                name: "anEndpoint",
                method: "get",
                url: "/test",
            },
        ],
    });

    expect(collection.getName()).toBe("acollection");
});

test("endpoint collections should not contain spaces in their names", () => {
    expect(() => {
        new EndpointCollection({
            name: "a collection",
            baseURL: "http://localhost:3000",
            endpoints: [
                {
                    name: "anEndpoint",
                    method: "get",
                    url: "/test",
                },
            ],
        });
    }).toThrow();
});

test("endpoint collections should have a well formed baseURL", () => {
    expect(() => {
        new EndpointCollection({
            name: "aCollection",
            baseURL: "not-a-url",
            endpoints: [
                {
                    name: "anEndpoint",
                    method: "get",
                    url: "/test",
                },
            ],
        });
    }).toThrow();
});

test("endpoint collections should remove trailing '/' on their baseURL", () => {
    const collection = new EndpointCollection({
        name: "aCollection",
        baseURL: "http://localhost:3000/",
        endpoints: [
            {
                name: "anEndpoint",
                method: "get",
                url: "/test",
            },
        ],
    });

    expect(collection.getURL()).toBe("http://localhost:3000");
});
