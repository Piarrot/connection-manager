interface parserOptions {
    [key: string]: string | ParserFunction;
}

type ParserFunction = (value: any) => void;

export function applyOptions(
    obj: any,
    providedOptions: any,
    defaultOptions: any = {},
    parsers?: parserOptions
) {
    let optionsToApply = defaultOptions;
    if (providedOptions) {
        optionsToApply = { ...defaultOptions, ...providedOptions };
    }
    for (const key in optionsToApply) {
        const option = optionsToApply[key];
        if (parsers && parsers[key]) {
            runParser(parsers[key], obj, option);
            continue;
        }
        obj[key] = option;
    }
}

function runParser(parser: string | ParserFunction, obj: any, value: any) {
    if (parser instanceof Function) {
        parser.call(obj, value);
    } else {
        obj[parser] = value;
    }
}
