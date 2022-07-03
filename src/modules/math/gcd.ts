/**
 * find the greatest common divisor of a and b
 * @param a any number
 * @param b any number
 * @returns a and b gcd
 */
const gcd = (a: number, b: number): number => {
    let n = Math.max(a, b);
    let m = Math.min(a, b);
    let r = n % m;
    while (r !== 0) {
        n = m;
        m = r;
        r = n % m;
    }
    return m;
};

export default gcd;
