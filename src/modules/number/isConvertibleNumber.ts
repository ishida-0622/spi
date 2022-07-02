import isNumber from "./isNumber";

/**
 * Can value be converted to a number?
 * @param value any value
 * @returns true if value is able to converted to a number
 */
const isConvertibleNumber = (value: unknown): boolean => {
    if (typeof value === "number") {
        return isFinite(value);
    } else if (typeof value === "string") {
        return isNumber(Number(value)) && isNumber(parseFloat(value));
    }
    return false;
};

export default isConvertibleNumber;
