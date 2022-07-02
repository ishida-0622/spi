/**
 * value is number?
 * @param value any value
 * @returns true if value is number and value is not NaN. false else.
 */
const isNumber = (value: unknown): boolean => {
    return typeof value === "number" && isFinite(value);
};

export default isNumber;
