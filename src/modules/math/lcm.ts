import gcd from "./gcd";

/**
 * find the least common multiple of a and b
 * @param a any number
 * @param b any number
 * @returns a and b lcm
 */
const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
};

export default lcm;
