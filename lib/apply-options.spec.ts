import { applyOptions } from "./apply-options";

let targetObj: any;
beforeEach(() => {
    targetObj = {
        name: "someName",
        aProperty: 125,
        anObject: {},
    };
});
test("parse config, no default options", () => {
    applyOptions(
        targetObj,
        {
            name: "a name",
            anObject: {
                aSetting: true,
            },
        },
        {}
    );
    expect(targetObj.name).toBe("a name");
    expect(targetObj.aProperty).toBe(125);
    expect(targetObj.anObject).toEqual({
        aSetting: true,
    });
});

test("parse config, with some default options", () => {
    const defaultOptions = {
        aProperty: 130,
        anObject: {
            someSetting: 10,
        },
    };
    applyOptions(
        targetObj,
        {
            name: "a name",
            anObject: {
                aSetting: true,
            },
        },
        defaultOptions
    );
    expect(targetObj.name).toBe("a name");
    expect(targetObj.aProperty).toBe(130);
    expect(targetObj.anObject).toEqual({
        aSetting: true,
    });
});

test("parse config, with custom parsers", () => {
    const parsers = {
        aNewProp: "_newProp",
        name: (value: string) => {
            targetObj.name = value.toUpperCase().replace(" ", "");
        },
    };
    applyOptions(
        targetObj,
        {
            aNewProp: "something new",
            name: "a name",
            anObject: {
                aSetting: true,
            },
        },
        {},
        parsers
    );
    expect(targetObj.name).toBe("ANAME");
    expect(targetObj.aProperty).toBe(125);
    expect(targetObj.aNewProp).toBeUndefined();
    expect(targetObj._newProp).toBe("something new");
    expect(targetObj.anObject).toEqual({
        aSetting: true,
    });
});
