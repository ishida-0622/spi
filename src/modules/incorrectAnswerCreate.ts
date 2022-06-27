import getRandomInt from "./number/getRandomInt";

/**
 * incorrect answer create
 * @param ans answer
 * @param min minimum value
 * @param max max value
 * @param arr already exists options. default -> []
 * @param evenOdd true -> match even odd numbers with answer. default -> false
 * @returns returns is not equal answer and not in arr
 */
const incorrectAnswerCreate = (
    ans: number,
    min: number,
    max: number,
    arr: number[] = [],
    evenOdd: boolean = false
): number => {
    let res = getRandomInt(min, max);
    if (
        max - min < arr.length ||
        (evenOdd && Math.ceil((max - min) / 2) <= arr.length)
    ) {
        // 最小値から最大値まで全てを使い切っている場合の無限ループ回避
        return 0;
    }
    while (
        res === ans ||
        arr.some((val) => val === res) ||
        (evenOdd && res % 2 !== ans % 2)
    ) {
        res = getRandomInt(min, max);
    }
    return res;
};

export default incorrectAnswerCreate;
