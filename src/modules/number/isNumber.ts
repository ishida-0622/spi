/**
 * value is number?
 * @param val any value
 * @returns true if val is number and val is not NaN. false else.
 */
const isNumber = (val: unknown): boolean => {
    return typeof val === "number" && isFinite(val);
};

export default isNumber;
