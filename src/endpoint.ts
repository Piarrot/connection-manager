type HTTPMethod = "get" | "post" | "delete" | "patch";

export default interface Endpoint {
    method: HTTPMethod;
    name: string;
    url: string;
    urlParameters: any;
    queryParameters: any;
}
