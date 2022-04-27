"use strict";
class inference {
    easy(rep) {
        const arr = shuffle(["A", "B", "C", "D"]);
        const A = arr[0] === "A" ? 1 : arr[1] === "A" ? 2 : arr[2] === "A" ? 3 : 4;
        const B = arr[0] === "B" ? 1 : arr[1] === "B" ? 2 : arr[2] === "B" ? 3 : 4;
        const C = arr[0] === "C" ? 1 : arr[1] === "C" ? 2 : arr[2] === "C" ? 3 : 4;
        const D = arr[0] === "D" ? 1 : arr[1] === "D" ? 2 : arr[2] === "D" ? 3 : 4;
        const notA = arr.filter(s => s !== "A");
        const Q = `<h3>Q.${rep}</h3>`;
        const html = `
        <p>
        A,B,C,Dの4人が勝負をした結果について以下のことが分かっている。<br><br>
        同じ順位の人はいない。<br>
        Aは${A}位だった。<br>
        ${notA[0]}は${notA[2]}よりも上の順位だった。<br>
        ${notA[1]}は${getRandomInt(0, 1) ? `${notA[0]}と${notA[2]}` : `${notA[2]}と${notA[0]}`}の間の順位だった。<br>
        BとCの順位の組み合わせは次のうちどれか。<br>
        選択肢がn,mの場合、B = n位,C = m位とする。
        </p>
        `;
        $("#question").html(Q + html);
        const opt = [];
        const notARank = [B, C, D].sort((a, b) => (a - b));
        for (let i = 0; i < 3; i++) {
            const tmp = notARank[i];
            for (let j = 0; j < 3; j++) {
                if (i !== j) {
                    opt.push([tmp, notARank[j]]);
                }
            }
        }
        let ans;
        opt.forEach((element, i) => {
            if (array_equal(element, [B, C])) {
                ans = i + 1;
            }
        });
        const optHtml = `
        <label><input type="radio" name="ans" class="ans" value="1" checked>${opt[0]}</label>
        <label><input type="radio" name="ans" class="ans" value="2">${opt[1]}</label>
        <label><input type="radio" name="ans" class="ans" value="3">${opt[2]}</label><br>
        <label><input type="radio" name="ans" class="ans" value="4">${opt[3]}</label>
        <label><input type="radio" name="ans" class="ans" value="5">${opt[4]}</label>
        <label><input type="radio" name="ans" class="ans" value="6">${opt[5]}</label><br>
        <button id="next">解答・解説へ</button>
        `;
        $("#ans").html(optHtml);
        const res = { inference: { ans: ans, arr: arr, a: A, b: B, c: C, d: D, html: html } };
        return res;
    }
    normal(rep) {
        $("#ans").html(`現在制作中です。<br><button id="next">次へ</button>`);
        const res = { inference: { ans: 0, arr: [], a: 0, b: 0, c: 0, d: 0, html: "html" } };
        return res;
    }
    hard(rep) {
        $("#ans").html(`現在制作中です。<br><button id="next">次へ</button>`);
        const res = { inference: { ans: 0, arr: [], a: 0, b: 0, c: 0, d: 0, html: "html" } };
        return res;
    }
}
const inferenceResult = (userAns, dic, diff) => {
    let html;
    if (diff === diffList.e) {
        let rank = ["?", "?", "?", "?"];
        rank[dic.inference.a - 1] = "A";
        const notA = dic.inference.arr.filter(s => s !== "A");
        html = `
        <h2>${dic.inference.ans === userAns ? "正解!" : "不正解..."}</h2>
        <h3>問題文</h3>
        ${dic.inference.html}
        <h3>解説</h3>
        <p>
        まず、Aは${dic.inference.a}位なので、「${rank}」となる。<br>
        ${notA[0]}は${notA[2]}よりも上の順位なので、${notA[0]} > ${notA[2]}となるが、正確な順位は分からない。<br>
        ${notA[1]}は${notA[0]}と${notA[2]}の間なので、${notA[0]} > ${notA[1]} > ${notA[2]}となる。<br>
        Aの順位は確定しているため、残りの3枠に当てはめると「${dic.inference.arr}」となる。
        </p>
        <button id="next">次の問題</button>
        `;
    }
    else {
        html = `<button id="next">次の問題</button>`;
    }
    $("#result").html(html);
    return userAns === dic.inference.ans;
};
