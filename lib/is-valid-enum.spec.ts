import { isValidStringEnum } from "./is-valid-enum";

enum StringEnum {
    key1 = "blabla1",
    key2 = "blabla2",
    key3 = "blabla3",
}

test("numeric enum, should throw if value is not defined", () => {
    expect(() => {
        isValidStringEnum<StringEnum>(StringEnum, "testing", "");
    }).toThrow();
});
test("numeric enum, should work if value is defined", () => {
    expect(
        isValidStringEnum<StringEnum>(StringEnum, "blabla1", "")
    ).toBeDefined();
});
