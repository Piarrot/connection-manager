export function waitSeconds(seconds: number) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds);
    });
}
