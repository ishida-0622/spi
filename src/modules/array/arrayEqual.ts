/**
 * two array equal?
 * @param a any array
 * @param b any array
 * @returns a === b ? true : false
 */
const arrayEqual = <T>(a: T[], b: T[]): boolean => {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};

export default arrayEqual;
