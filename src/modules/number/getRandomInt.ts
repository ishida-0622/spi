/**
 * returns random int. min <= return <= max
 * @param min minimum value
 * @param max max value
 * @param excludedNumbers numbers to exclude
 * @returns min to max random int
 */
const getRandomInt = (
    min: number,
    max: number,
    ...excludedNumbers: number[]
): number => {
    let res = Math.floor(Math.random() * (max - min + 1) + min);
    while (excludedNumbers.some((val) => val === res)) {
        res = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return res;
};

export default getRandomInt;
