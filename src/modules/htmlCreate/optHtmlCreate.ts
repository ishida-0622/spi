import AtLeast from "../types/atLeast";

/**
 * radio button html create
 * @param arr length 1 or more array
 * @returns radio button html
 */
const optHtmlCreate = <T>(arr: AtLeast<1, T>): string => {
    // 表示されない初期で選択されているラジオボタン
    let res = `<label><input type="radio" name="ans" class="ans" value="${Number.MIN_SAFE_INTEGER}" checked style="display: none;""></label>`;
    arr.forEach((val, i) => {
        res += `<label><input type="radio" name="ans" class="ans" value="${val}">${val}</label>`;

        // 選択肢が5個以上あれば真ん中に改行を入れる
        if (i === Math.round(arr.length / 2) - 1 && arr.length >= 5) {
            res += "<br>";
        }
    });
    res += `<br><button id="next">解答・解説へ</button>`;
    return res;
};

export default optHtmlCreate;
