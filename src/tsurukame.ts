import $ from "jquery";
import { q } from "./modules/interface";
import { diffList } from "./modules/enums";
import optHtmlCreate from "./modules/htmlCreate/optHtmlCreate";
import incorrectAnswerCreate from "./modules/incorrectAnswerCreate";
import getRandomInt from "./modules/number/getRandomInt";
import AtLeast from "modules/types/atLeast";
import dict from "modules/types/dict";

class Tsurukame implements q {
    easy(rep: number): dict {
        const sum = getRandomInt(10, 30); // 合計数
        const apple = getRandomInt(1, sum - 1); // りんごの数
        const appleValues = getRandomInt(5, 30) * 10; // りんごの値段 50~300
        const orange = sum - apple; // オレンジの数
        const orangeValues = getRandomInt(5, 30, appleValues / 10) * 10; // オレンジの値段 50~300
        const sumValues = appleValues * apple + orangeValues * orange;
        const Q = `<h3>Q.${rep}</h3>`;
        const html: string = `
        <p>
        1個${appleValues}円の${
            appleValues >= 200 ? "高級" : ""
        }りんごと、1個${orangeValues}円の${
            orangeValues >= 200 ? "高級" : ""
        }オレンジを<br>
        合計${sum}個購入して合計金額が${sumValues}円だった場合、<br>
        りんごを購入した数はいくつか。
        </p>`;
        $("#question").html(Q + html);

        const opt: AtLeast<1, number> =
            apple !== orange ? [apple, orange] : [apple];
        while (opt.length < 6) {
            opt.push(
                incorrectAnswerCreate(apple, Math.ceil(apple / 10), sum, opt)
            );
        }
        opt.sort((a, b) => a - b);
        const optHtml: string = optHtmlCreate(opt);
        $("#ans").html(optHtml);

        const res: dict = {
            tsurukame: {
                ans: apple,
                apple: apple,
                appleValues: appleValues,
                orange: orange,
                orangeValues: orangeValues,
                sum: sum,
                sumValues: sumValues,
                html: html,
            },
        };
        return res;
    }

    normal(rep: number): dict {
        const sum = getRandomInt(20, 50); // 合計数 20~50
        const apple = getRandomInt(5, sum - 10); // りんごの数
        const appleValues = getRandomInt(5, 30) * 10; // りんごの値段 50~300
        const banana = getRandomInt(1, sum - apple - 3); // バナナの数
        const bananaValues = getRandomInt(5, 30, appleValues / 10) * 10; // バナナの値段 50~300
        const orange = sum - apple - banana; // オレンジの数
        const orangeValues =
            getRandomInt(5, 30, appleValues / 10, bananaValues / 10) * 10; // オレンジの値段 50~300
        const sumValues =
            appleValues * apple + orangeValues * orange + banana * bananaValues;
        const Q = `<h3>Q.${rep}</h3>`;
        const html: string = `
        <p>
        1個${appleValues}円の${
            appleValues >= 200 ? "高級" : ""
        }りんごと、1個${orangeValues}円の${
            orangeValues >= 200 ? "高級" : ""
        }オレンジと、1個${bananaValues}円の${
            bananaValues >= 200 ? "高級" : ""
        }バナナを<br>
        合計${sum}個購入して合計金額が${sumValues}円だった。<br>
        オレンジを購入した数が${orange}個だった場合、りんごはいくつ購入したか。
        </p>
        `;
        $("#question").html(Q + html);

        const opt: AtLeast<1, number> = [apple];
        while (opt.length < 6) {
            opt.push(
                incorrectAnswerCreate(apple, Math.ceil(apple / 10), sum, opt)
            );
        }
        opt.sort((a, b) => a - b);
        const optHtml: string = optHtmlCreate(opt);
        $("#ans").html(optHtml);

        const res: dict = {
            tsurukame: {
                ans: apple,
                apple: apple,
                appleValues: appleValues,
                orange: orange,
                orangeValues: orangeValues,
                banana: banana,
                bananaValues: bananaValues,
                sum: sum,
                sumValues: sumValues,
                html: html,
            },
        };
        return res;
    }

    hard(rep: number): dict {
        const sum = getRandomInt(30, 100); // 合計数 30~100
        const orange = getRandomInt(5, Math.floor((sum - 15) / 2)); // オレンジの数
        const orangeValues = getRandomInt(5, 30) * 10; // オレンジの値段 50~300
        const banana = orange; // バナナの数 オレンジと同じ
        const bananaValues = getRandomInt(5, 30, orangeValues / 10) * 10; // バナナの値段 50~300
        const apple = sum - orange - banana; // りんごの数
        const appleValues =
            getRandomInt(5, 30, bananaValues / 10, orangeValues / 10) * 10; // りんごの値段 50~300
        const sumValues =
            appleValues * apple + orangeValues * orange + banana * bananaValues;
        const html: string = `<h3>Q.${rep}</h3><p>1個${appleValues}円の${
            appleValues >= 200 ? "高級" : ""
        }りんごと、1個${orangeValues}円の${
            orangeValues >= 200 ? "高級" : ""
        }オレンジと、1個${bananaValues}円の${
            bananaValues >= 200 ? "高級" : ""
        }バナナを<br>合計${sum}個購入して合計金額が${sumValues}円だった。<br>オレンジとバナナを同じ個数買った場合、りんごはいくつ購入したか。</p>`;
        $("#question").html(html);

        const opt: AtLeast<1, number> = [apple];
        while (opt.length < 6) {
            opt.push(
                incorrectAnswerCreate(
                    apple,
                    Math.ceil(apple / 10),
                    sum,
                    opt,
                    true
                )
            );
        }
        opt.sort((a, b) => a - b);
        const optHtml: string = optHtmlCreate(opt);
        $("#ans").html(optHtml);

        const res: dict = {
            tsurukame: {
                ans: apple,
                apple: apple,
                appleValues: appleValues,
                orange: orange,
                orangeValues: orangeValues,
                banana: banana,
                bananaValues: bananaValues,
                sum: sum,
                sumValues: sumValues,
                html: html,
            },
        };
        return res;
    }
}

export const turukameResult = (
    userAns: number,
    dic: dict,
    diff: diffList
): boolean => {
    let html: string;
    if (diff === diffList.e) {
        html = `
        <h2>${dic.tsurukame!.ans === userAns ? "正解!" : "不正解..."}</h2>
        <h3>問題文</h3>
        ${dic.tsurukame!.html}
        <h3>解説</h3>
        <p>
        もし${dic.tsurukame!.sum}個全てがオレンジだったと仮定すると、${
            dic.tsurukame!.sum
        }個 × ${dic.tsurukame!.orangeValues}円で${
            dic.tsurukame!.sum * dic.tsurukame!.orangeValues
        }円となる。<br>
        実際の合計金額は${dic.tsurukame!.sumValues}円なので、差額は |${
            dic.tsurukame!.sumValues
        } - ${dic.tsurukame!.sum * dic.tsurukame!.orangeValues}| = ${Math.abs(
            dic.tsurukame!.sumValues -
                dic.tsurukame!.sum * dic.tsurukame!.orangeValues
        )}円。<br>
        りんごとオレンジの差額は |${dic.tsurukame!.appleValues} - ${
            dic.tsurukame!.orangeValues
        }| = ${Math.abs(
            dic.tsurukame!.appleValues - dic.tsurukame!.orangeValues
        )}円。<br>
        【全体の差額 ÷ 果物の差額 = 果物の差分】の式が成り立つため、<br>
        答えは、${Math.abs(
            dic.tsurukame!.sumValues -
                dic.tsurukame!.sum * dic.tsurukame!.orangeValues
        )}円 ÷ ${Math.abs(
            dic.tsurukame!.appleValues - dic.tsurukame!.orangeValues
        )}円 = ${dic.tsurukame!.ans}個。
        </p>
        <details>
        <summary>連立方程式を使った解き方</summary>
        <p>
        りんごの数を𝒙、値段を𝒏、オレンジの数を𝒚、値段を𝒎、果物の合計を𝒂、値段の合計を𝒃とすると、<br>
        【𝒙 + 𝒚 = 𝒂】【𝒏𝒙 + 𝒎𝒚 = 𝒃】<br>
        の2つの式が成り立つ。式を変形すると、<br>
        𝒙 + 𝒚 = 𝒂<br>𝒏𝒙 + 𝒎𝒚 = 𝒃<br>
        ↓<br>
        𝒎𝒙 + 𝒎𝒚 = 𝒎𝒂<br>𝒏𝒙 + 𝒎𝒚 = 𝒃<br>
        ↓<br>
        𝒎𝒙 + 𝒀 = 𝒎𝒂<br>𝒏𝒙 + 𝒀 = 𝒃<br>
        ↓<br>
        |𝒎𝒙 - 𝒏𝒙| = |𝒎𝒂 - 𝒃|<br>
        となる。<br><br>
        実際に当てはめてみると、<br>
        𝒙 + 𝒚 = ${dic.tsurukame!.sum}<br>
        ${dic.tsurukame!.appleValues}𝒙 + ${dic.tsurukame!.orangeValues}𝒚 = ${
            dic.tsurukame!.sumValues
        }<br>
        ↓<br>
        ${dic.tsurukame!.orangeValues}𝒙 + ${dic.tsurukame!.orangeValues}𝒚 = ${
            dic.tsurukame!.sum * dic.tsurukame!.orangeValues
        }<br>
        ${dic.tsurukame!.appleValues}𝒙 + ${dic.tsurukame!.orangeValues}𝒚 = ${
            dic.tsurukame!.sumValues
        }<br>
        ↓<br>
        ${dic.tsurukame!.orangeValues}𝒙 + 𝒀 = ${
            dic.tsurukame!.sum * dic.tsurukame!.orangeValues
        }<br>
        ${dic.tsurukame!.appleValues}𝒙 + 𝒀 = ${dic.tsurukame!.sumValues}<br>
        ↓<br>
        |${dic.tsurukame!.orangeValues}𝒙 - ${dic.tsurukame!.appleValues}𝒙| = |${
            dic.tsurukame!.sum * dic.tsurukame!.orangeValues
        } - ${dic.tsurukame!.sumValues}|<br>
        ↓<br>
        ${Math.abs(
            dic.tsurukame!.orangeValues - dic.tsurukame!.appleValues
        )}𝒙 = ${Math.abs(
            dic.tsurukame!.sum * dic.tsurukame!.orangeValues -
                dic.tsurukame!.sumValues
        )}<br>
        𝒙 = ${dic.tsurukame!.ans}
        </p>
        </details>
        <button id="next">次の問題</button>
        `;
    } else if (diff === diffList.n) {
        const notOrangeSum: number = dic.tsurukame!.sum - dic.tsurukame!.orange;
        const notOrangeValues: number =
            dic.tsurukame!.sumValues -
            dic.tsurukame!.orange * dic.tsurukame!.orangeValues;
        html = `
        <h2>${dic.tsurukame!.ans === userAns ? "正解!" : "不正解..."}</h2>
        <h3>問題文</h3>
        ${dic.tsurukame!.html}
        <h3>解説</h3>
        <p>
        オレンジを${
            dic.tsurukame!.orange
        }個購入しているので、まずはその分を合計金額から引く。<br>
        ${dic.tsurukame!.sumValues}円 - ${dic.tsurukame!.orange}個 × ${
            dic.tsurukame!.orangeValues
        }円 = ${notOrangeValues}円。<br>
        もし、残りの${notOrangeSum}個全てがバナナだったと仮定すると、${notOrangeSum}個 × ${dic.tsurukame!
            .bananaValues!}円で${
            notOrangeSum * dic.tsurukame!.bananaValues!
        }円となる。<br>
        実際の残りの金額は${notOrangeValues}円なので、差額は |${notOrangeValues} - ${
            notOrangeSum * dic.tsurukame!.bananaValues!
        }| = ${Math.abs(
            notOrangeValues - notOrangeSum * dic.tsurukame!.bananaValues!
        )}円。<br>
        りんごとバナナの差額は |${dic.tsurukame!.appleValues} - ${dic.tsurukame!
            .bananaValues!}| = ${Math.abs(
            dic.tsurukame!.appleValues - dic.tsurukame!.bananaValues!
        )}円。<br>
        【全体の差額 ÷ 果物の差額 = 果物の差分】の式が成り立つため、<br>
        答えは、${Math.abs(
            notOrangeValues - notOrangeSum * dic.tsurukame!.bananaValues!
        )}円 ÷ ${Math.abs(
            dic.tsurukame!.appleValues - dic.tsurukame!.bananaValues!
        )}円 = ${dic.tsurukame!.ans}個。
        </p>
        <button id="next">次の問題</button>
        `;
    } else {
        const evenSum: number =
            dic.tsurukame!.sum % 2
                ? dic.tsurukame!.sum - 1
                : dic.tsurukame!.sum;
        const evenSumValues: number =
            dic.tsurukame!.sum % 2
                ? dic.tsurukame!.sumValues - dic.tsurukame!.appleValues
                : dic.tsurukame!.sumValues;
        const orangeBananaSumValues: number =
            dic.tsurukame!.orangeValues + dic.tsurukame!.bananaValues!;
        html = `
        <h2>${dic.tsurukame!.ans === userAns ? "正解!" : "不正解..."}</h2>
        <h3>問題文</h3>
        ${dic.tsurukame!.html}
        <h3>解説</h3>
        <p>
        ${
            dic.tsurukame!.sum % 2
                ? `オレンジとバナナの合計は必ず偶数のため、端数の1個はりんごに確定する。<br>よって、合計数を${evenSum}個、合計金額を${evenSumValues}円として解説に入る。<br><br>`
                : ""
        }
        オレンジとバナナを同じ数購入しているので、2個で1セットにまとめて考える。<br>
        ${dic.tsurukame!.orangeValues}円 + ${dic.tsurukame!
            .bananaValues!}円 = ${orangeBananaSumValues}円なので、1セット = 2個で${orangeBananaSumValues}円<br>
        もし、${evenSum}個全てオレンジとバナナのセットだったと仮定すると、${
            evenSum / 2
        }セット × ${orangeBananaSumValues}円 = ${
            (evenSum / 2) * orangeBananaSumValues
        }円<br>
        実際の金額は${evenSumValues}円なので、差額は |${evenSumValues} - ${
            (evenSum / 2) * orangeBananaSumValues
        }| = ${Math.abs(
            evenSumValues - (evenSum / 2) * orangeBananaSumValues
        )}円<br>
        オレンジとバナナのセットとりんご2個の差額は |${orangeBananaSumValues} - (${
            dic.tsurukame!.appleValues
        } × 2)| = ${Math.abs(
            orangeBananaSumValues - dic.tsurukame!.appleValues * 2
        )}円<br>
        【全体の差額 ÷ 1セットの差額 = セットの差分】の式が成り立つため、<br>
        ${Math.abs(
            evenSumValues - (evenSum / 2) * orangeBananaSumValues
        )}円 ÷ ${Math.abs(
            orangeBananaSumValues - dic.tsurukame!.appleValues * 2
        )}円 = ${
            dic.tsurukame!.sum % 2
                ? (dic.tsurukame!.ans - 1) / 2
                : dic.tsurukame!.ans / 2
        }セット<br>
        1セット2個なので2を掛け、${
            dic.tsurukame!.sum % 2 ? `最後に端数の1個を足して、` : ""
        }答えは${dic.tsurukame!.ans}個。
        </p>
        <button id="next">次の問題</button>
        `;
    }

    $("#result").html(html);
    return userAns === dic.tsurukame!.ans;
};

export default Tsurukame;
