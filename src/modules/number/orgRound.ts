/**
 * round numbers to n decimal places
 * @param value any number
 * @param digit digit default -> 0
 * @returns number rounded to n decimal places
 */
const orgRound = (value: number, digit: number = 0): number => {
    return Math.round(value * 10 ** digit) / 10 ** digit;
};

export default orgRound;
