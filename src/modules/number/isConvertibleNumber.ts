/**
 * Can val be converted to a number?
 * @param val any value
 * @returns true if value is able to converted to a number
 */
const isConvertibleNumber = (val: unknown): boolean => {
    if (typeof val === "number") {
        return isFinite(val);
    } else if (typeof val === "string") {
        return (
            Number(val) === parseFloat(val) &&
            isFinite(Number(val)) &&
            isFinite(parseFloat(val))
        );
    }
    return false;
};

export default isConvertibleNumber;
