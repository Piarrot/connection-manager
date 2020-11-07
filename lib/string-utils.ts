export function isValidFullURL(str: string) {
    let pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "(localhost)|" +
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i" //case insensitive
    );
    return pattern.test(str);
}

export function isValidBaseURL(str: string) {
    let pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "(localhost)|" +
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*$", // port and path,
        "i" //case insensitive
    );
    return pattern.test(str);
}

export function isValidURLFragment(str: string) {
    let pattern = new RegExp(
        "^\\/" + // starting /
            "([-a-z\\d%_.~+]\\/*)*" + // path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + //query string
            "(\\#[-a-z\\d_]*)?$", // fragment locator
        "i" //case insensitive
    );
    return pattern.test(str);
}
