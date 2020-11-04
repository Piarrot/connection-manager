export function isValidStringEnum<T>(
    enumType: any,
    value: string,
    message: string
) {
    const methodValuesArray = Object.keys(enumType).map((key) => {
        return enumType[key].toString();
    });
    const methodKeysArray = Object.keys(enumType);

    const index = methodValuesArray.indexOf(value);
    if (index == -1) {
        throw new Error(message);
    }
    return enumType[methodKeysArray[index]] as T;
}
