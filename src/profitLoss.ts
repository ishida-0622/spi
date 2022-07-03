import $ from "jquery";
import QuestionBase from "./modules/interfaces/questionBase";
import { diffList } from "./modules/enums";
import optHtmlCreate from "./modules/htmlCreate/optHtmlCreate";
import incorrectAnswerCreate from "./modules/incorrectAnswerCreate";
import getRandomInt from "./modules/number/getRandomInt";
import orgRound from "./modules/number/orgRound";
import AtLeast from "modules/types/atLeast";
import valueToUse from "modules/types/valueToUse";

class ProfitLoss implements QuestionBase {
    easy(rep: number): valueToUse {
        const cost = getRandomInt(10, 30) * 100; // 原価 1000~3000 100刻み
        const profit = getRandomInt(2, 5) / 10; // 利益率 0.2~0.5 0.1刻み
        const regular = (cost * (10 + Math.round(profit * 10))) / 10; // 定価 原価 * (1 + 利益率)
        const discount = getRandomInt(2, 8) / 20; // 割引率 0.1~0.4 0.05刻み
        const selling = Math.floor((regular * (100 - discount * 100)) / 100); // 売値 定価 * (1 - 割引率) 桁落ち回避のため整数化して計算

        const Q = `<h3>Q.${rep}</h3>`;
        const html = `
        <p>
        商品Xの原価は${cost}円である。<br>
        この商品に${profit * 10}割の利益を乗せて定価としたが、<br>
        売れないので定価の${discount * 100}%引きで売ることにした。<br>
        最終的な売値はいくらか。なお、小数点以下は切り捨てとする。
        </p>
        `;
        $("#question").html(Q + html);

        const opt: AtLeast<1, number> = [selling];
        while (opt.length < 6) {
            opt.push(
                incorrectAnswerCreate(
                    selling,
                    Math.floor(selling * 0.8),
                    Math.floor(selling * 1.2),
                    opt
                )
            );
        }
        opt.sort((a, b) => a - b);
        const optHtml = optHtmlCreate(opt);
        $("#ans").html(optHtml);

        const res: valueToUse = {
            profitLoss: {
                ans: selling,
                cost: cost,
                profit: profit,
                regular: regular,
                discount: discount,
                selling: selling,
                html: html,
            },
        };
        return res;
    }

    normal(rep: number): valueToUse {
        const cost = 100;
        const profit = getRandomInt(1, 20) / 100; // 0.01~0.2 0.01刻み
        const discount = getRandomInt(2, 6) / 20; // 0.1~0.3 0.05刻み
        const ans = Math.floor(
            Math.round((1 + profit) * 100) /
                (Math.round(100 - discount * 100) / 100) -
                100
        );
        const regular = cost * ((1 + profit) / (1 - discount));
        const selling = cost + profit * 100;
        const Q = `<h3>Q.${rep}</h3>`;
        const html = `
        <p>
        ある商品を定価の${discount * 100}%引きで売ったら、原価の${Math.floor(
            profit * 100
        )}%の利益が得られた。<br>
        この商品を定価で売ると、原価の何%の利益が得られるか。<br>
        なお、小数点以下は切り捨てとする。
        </p>
        `;
        $("#question").html(Q + html);

        const opt: AtLeast<1, number> = [ans];
        while (opt.length < 6) {
            opt.push(
                incorrectAnswerCreate(
                    ans,
                    Math.floor(ans * 0.7),
                    Math.floor(ans * 1.3),
                    opt
                )
            );
        }
        opt.sort((a, b) => a - b);
        const optHtml = optHtmlCreate(opt);
        $("#ans").html(optHtml);

        const res: valueToUse = {
            profitLoss: {
                ans: ans,
                cost: cost,
                profit: profit,
                regular: regular,
                discount: discount,
                selling: selling,
                html: html,
            },
        };
        return res;
    }

    hard(rep: number): valueToUse {
        const cost = getRandomInt(20, 40) * 100; // 原価 2000~4000 100刻み
        const profit = getRandomInt(2, 5) / 10; // 利益率 0.2~0.5 0.1刻み
        const regular = cost * (1 + profit); // 定価 原価 * (1 + 利益率)
        let discount = getRandomInt(1, 4) / 10; // 割引率 0.1~0.4 0.1刻み
        while (1 > orgRound(1 + profit, 1) * orgRound(1 - discount, 1)) {
            // 売値が原価を上回るまで
            discount = getRandomInt(1, 4) / 10;
        }
        const selling = Math.round((regular * (100 - discount * 100)) / 100); // 売値
        const Q = `<h3>Q.${rep}</h3>`;
        const html = `
        <p>
        ある商品に原価の${profit * 10}割の利益を得られるように定価をつけた。<br>
        しかし、売れないので定価の${discount * 10}割引で売ったところ${
            selling - cost
        }円の利益が出た。<br>
        この商品の原価はいくらか。
        </p>
        `;
        $("#question").html(Q + html);

        let opt: AtLeast<1, number> = [cost / 100];
        while (opt.length < 6) {
            opt.push(
                incorrectAnswerCreate(
                    cost / 100,
                    Math.max(20, cost / 100 - 10),
                    Math.min(40, cost / 100 + 10),
                    opt
                )
            );
        }
        for (let i = 0; i < opt.length; i++) {
            opt[i] *= 100;
        }
        opt.sort((a, b) => a - b);
        const optHtml = optHtmlCreate(opt);
        $("#ans").html(optHtml);

        const res: valueToUse = {
            profitLoss: {
                ans: cost,
                cost: cost,
                profit: profit,
                regular: regular,
                discount: discount,
                selling: selling,
                html: html,
            },
        };
        return res;
    }
}

export const profitLossResult = (
    userAns: number,
    dic: valueToUse,
    diff: diffList
): boolean => {
    let html: string;
    if (diff === diffList.e) {
        html = `
        <h2>${dic.profitLoss!.ans === userAns ? "正解!" : "不正解..."}</h2>
        <h3>問題文</h3>
        ${dic.profitLoss!.html}
        <h3>解説</h3>
        <p>
        問題文の通りに計算していけばよい。<br>
        原価の${dic.profitLoss!.cost}円に利益の${
            dic.profitLoss!.profit * 10
        }割を上乗せするので、<br>
        ${dic.profitLoss!.cost} × ${1 + dic.profitLoss!.profit} = ${
            dic.profitLoss!.regular
        }円。<br>
        そこからさらに${dic.profitLoss!.discount * 100}%引くので、<br>
        ${dic.profitLoss!.regular} × (1 - ${dic.profitLoss!.discount}) ${
            dic.profitLoss!.selling ===
            (dic.profitLoss!.regular * (100 - dic.profitLoss!.discount * 100)) /
                100
                ? "="
                : "≒"
        } ${dic.profitLoss!.selling}円。<br>
        答えは${dic.profitLoss!.ans}円。
        </p>
        <button id="next">次の問題</button>
        `;
    } else if (diff === diffList.n) {
        html = `
        <h2>${dic.profitLoss!.ans === userAns ? "正解!" : "不正解..."}</h2>
        <h3>問題文</h3>
        ${dic.profitLoss!.html}
        <h3>解説</h3>
        <p>
        答えを𝑿、原価を𝒀として問題文を式に表すと、<br>
        𝒀 × (1 + 𝑿) × (1 - ${dic.profitLoss!.discount}) = 𝒀 × (1 + ${
            dic.profitLoss!.profit
        }) となる。<br>
        両辺の𝒀を消すと、(1 + 𝑿) × (1 - ${dic.profitLoss!.discount}) = (1 + ${
            dic.profitLoss!.profit
        })となり、<br>
        これを変形すると、<br>
        (1 + 𝑿) = (1 + ${dic.profitLoss!.profit}) ÷ (1 - ${
            dic.profitLoss!.discount
        })<br>
        (1 + 𝑿) = ${(100 + Math.round(dic.profitLoss!.profit * 100)) / 100} ÷ ${
            1 - dic.profitLoss!.discount
        }<br>
        𝑿 = ${(100 + Math.round(dic.profitLoss!.profit * 100)) / 100} ÷ ${
            1 - dic.profitLoss!.discount
        } - 1<br>
        𝑿 = ${orgRound(
            (Math.round((1 + dic.profitLoss!.profit) * 100) /
                (Math.round(100 - dic.profitLoss!.discount * 100) / 100) -
                100) /
                100,
            5
        )}<br>
        パーセント表記にして${
            dic.profitLoss!.ans !==
            Math.round((1 + dic.profitLoss!.profit) * 100) /
                (Math.round(100 - dic.profitLoss!.discount * 100) / 100) -
                100
                ? "小数点以下を切り捨てて"
                : ""
        }答えは${dic.profitLoss!.ans}%。
        </p>
        <button id="next">次の問題</button>
        `;
    } else {
        html = `
        <h2>${dic.profitLoss!.ans === userAns ? "正解!" : "不正解..."}</h2>
        <h3>問題文</h3>
        ${dic.profitLoss!.html}
        <h3>解説</h3>
        <p>
        原価を𝑿として式に表すと、<br>
        𝑿 × (1 + ${dic.profitLoss!.profit}) × (1 - ${
            dic.profitLoss!.discount
        }) = 𝑿 + ${dic.profitLoss!.selling - dic.profitLoss!.cost}となる。<br>
        これを変形すると、<br>
        𝑿 × ${1 + dic.profitLoss!.profit} × ${
            (10 - Math.round(dic.profitLoss!.discount * 10)) / 10
        } = 𝑿 + ${dic.profitLoss!.selling - dic.profitLoss!.cost}<br>
        𝑿 × ${
            (Math.round(10 + dic.profitLoss!.profit * 10) *
                (10 - Math.round(dic.profitLoss!.discount * 10))) /
            100
        } = 𝑿 + ${dic.profitLoss!.selling - dic.profitLoss!.cost}<br>
        𝑿 × 1 + 𝑿 × ${
            (Math.round(10 + dic.profitLoss!.profit * 10) *
                (10 - Math.round(dic.profitLoss!.discount * 10)) -
                100) /
            100
        } = 𝑿 × 1 + ${dic.profitLoss!.selling - dic.profitLoss!.cost}<br>
        𝑿 × ${
            (Math.round(10 + dic.profitLoss!.profit * 10) *
                (10 - Math.round(dic.profitLoss!.discount * 10)) -
                100) /
            100
        } = ${dic.profitLoss!.selling - dic.profitLoss!.cost}<br>
        ${dic.profitLoss!.selling - dic.profitLoss!.cost} ÷ ${
            (Math.round(10 + dic.profitLoss!.profit * 10) *
                (10 - Math.round(dic.profitLoss!.discount * 10)) -
                100) /
            100
        } = 𝑿<br>
        𝑿 = ${dic.profitLoss!.ans}<br>
        答えは${dic.profitLoss!.ans}
        </p>
        <button id="next">次の問題</button>
        `;
    }
    $("#result").html(html);
    return userAns === dic.profitLoss!.ans;
};

export default ProfitLoss;
