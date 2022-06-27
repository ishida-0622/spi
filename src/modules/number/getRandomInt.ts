/**
 * returns random int. min <= return <= max
 * @param min minimum value
 * @param max max value
 * @param exclude_num numbers to exclude
 * @returns min to max random int
 */
const getRandomInt = (
    min: number,
    max: number,
    ...exclude_num: number[]
): number => {
    let res = Math.floor(Math.random() * (max - min + 1) + min);
    while (exclude_num.some((val) => val === res)) {
        res = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return res;
};

export default getRandomInt;
