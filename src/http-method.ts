import { isValidStringEnum } from "../lib/is-valid-enum";

export enum HTTPMethod {
    GET = "get",
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
