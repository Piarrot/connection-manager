import { isValidStringEnum } from "../lib/is-valid-enum";

export enum HTTPMethod {
    GET = "get",
    HEAD = "head",
    POST = "post",
    PATCH = "patch",
    PUT = "put",
    DELETE = "delete",
}

export function parseHTTPMethod(methodString: string): HTTPMethod {
    return isValidStringEnum<HTTPMethod>(
        HTTPMethod,
        methodString.toLowerCase(),
        `Incorrect method "${methodString}"`
    );
}

const cannotHaveBodyMethods = [HTTPMethod.GET, HTTPMethod.HEAD];

export function cannotHaveBody(method: HTTPMethod): boolean {
    if (cannotHaveBodyMethods.includes(method)) return true;
    return false;
}
