import Endpoint from "./endpoint";

type ConnectionProtocol = "http" | "https";
export default interface EndpointCollection {
    name: string;
    protocol: ConnectionProtocol;
    baseURL: string;
    endpoints: Endpoint[];
}
