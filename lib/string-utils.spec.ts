import {
    isValidBaseURL,
    isValidFullURL,
    isValidURLFragment,
} from "./string-utils";

test("url validations", () => {
    expect(isValidFullURL("http://localhost:3000")).toBeTruthy();
    expect(isValidFullURL("localhost:3000")).toBeTruthy();
    expect(isValidFullURL("not-a-url")).toBeFalsy();

    expect(isValidBaseURL("http://localhost:3000")).toBeTruthy();
    expect(isValidBaseURL("localhost:3000")).toBeTruthy();
    expect(isValidBaseURL("http://localhost:3000/test/")).toBeTruthy();
    expect(isValidBaseURL("not-a-url")).toBeFalsy();

    expect(isValidURLFragment("http://localhost:3000")).toBeFalsy();
    expect(isValidURLFragment("not-a-url")).toBeFalsy();

    expect(isValidURLFragment("/test")).toBeTruthy();
    expect(isValidURLFragment("/test?hello")).toBeTruthy();
    expect(isValidURLFragment("/test?hello=world")).toBeTruthy();
    expect(isValidURLFragment("/test#tag")).toBeTruthy();
});
