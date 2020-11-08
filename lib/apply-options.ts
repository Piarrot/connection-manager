interface ParserOptions {
    [key: string]: string | ParserFunction;
}

type ParserFunction = (value: any) => void;

interface ExtraOptions {
    defaultOptions?: any;
    customParsers?: ParserOptions;
}

export function applyOptions(
    obj: any,
    providedOptions?: any,
    extra?: ExtraOptions
) {
    let optionsToApply: any = {};
    if (extra && extra.defaultOptions) {
        optionsToApply = { ...extra.defaultOptions };
    }
    if (providedOptions) {
        optionsToApply = { ...optionsToApply, ...providedOptions };
    }
    for (const key in optionsToApply) {
        const option = optionsToApply[key];
        if (extra && extra.customParsers && extra.customParsers[key]) {
            runParser(extra.customParsers[key], obj, option);
            continue;
        }
        obj[key] = option;
    }
    return obj;
}

function runParser(parser: string | ParserFunction, obj: any, value: any) {
    if (parser instanceof Function) {
        parser.call(obj, value);
    } else {
        obj[parser] = value;
    }
}
