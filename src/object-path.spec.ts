import objectPath from "object-path";

test("object-path", () => {
    const obj = {
        products: {
            endpoints: [
                {
                    name: "getAll",
                },
            ],
        },
    };
    const endpoint = objectPath.get(obj, "products.endpoints.0");
    expect(endpoint).toBe(obj.products.endpoints[0]);

    const wrongValue = objectPath.get(obj, "products.getAll");
    expect(wrongValue).toBe(undefined);

    const coll = {
        products: {
            getAll: {
                name: "getAll",
            },
        },
    };

    const collectionEndpoint = objectPath.get(coll, "products.getAll");
    expect(collectionEndpoint).toBe(coll.products.getAll);
});
