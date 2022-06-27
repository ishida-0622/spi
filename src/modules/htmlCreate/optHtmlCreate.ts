import { AtLeast } from "../types";

/**
 * radio button html create
 * @param arr length 1 or more array
 * @returns radio button html
 */
const optHtmlCreate = <T>(arr: AtLeast<1, T>): string => {
    if (arr.length < 1) {
        throw new Error("main.ts line 86. array length = 0");
    }
    let res = `<label><input type="radio" name="ans" class="ans" value="${arr[0]}" checked>${arr[0]}</label>`;
    for (let i = 1; i < arr.length; i++) {
        res += `<label><input type="radio" name="ans" class="ans" value="${arr[i]}">${arr[i]}</label>`;
        if (i === Math.round(arr.length / 2) - 1) {
            res += "<br>";
        }
    }
    res += `<br><button id="next">解答・解説へ</button>`;
    return res;
};

export default optHtmlCreate;
