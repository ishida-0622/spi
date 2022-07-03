// Hello TypeScript
import $ from "jquery";
import { diffList } from "./modules/enums";
import Inference, { inferenceResult } from "./inference";
import ProfitLoss, { profitLossResult } from "./profitLoss";
import Tsurukame, { turukameResult } from "./tsurukame";
import getRandomInt from "./modules/number/getRandomInt";
import isConvertibleNumber from "./modules/number/isConvertibleNumber";
import pause from "./modules/timer/pause";
import timeCount from "./modules/timer/timeCount";
import valueToUse from "modules/types/valueToUse";
import questionTypes from "modules/types/questionTypes";

const result = (
    userAns: number,
    dic: valueToUse,
    diff: diffList,
    type: questions
) =>
    new Promise<boolean>((resolve) => {
        let res: boolean;
        switch (type) {
            case questions.tsurukame:
                res = turukameResult(userAns, dic, diff);
                break;
            case questions.inference:
                res = inferenceResult(userAns, dic, diff);
                break;
            case questions.profitLoss:
                res = profitLossResult(userAns, dic, diff);
                break;
            default:
                res = false;
                break;
        }

        $("#next").on("click", () => {
            $("#result").html("");
            resolve(res);
        });
    });

$("#start").on("click", () => {
    if (!isConvertibleNumber($("#questionNum").val())) {
        alert("入力値が不正です");
        return;
    }
    const qNum = Number($("#questionNum").val());
    if (qNum < 1 || qNum > 99) {
        alert("1~99の数値を入れてください");
        return;
    }
    const diff = $("input[name='diff']:checked").val();
    const type = $("input[name='type']:checked").val();
    let questionType: questions;
    let diffType: diffList;
    switch (type) {
        case "tsurukame":
            questionType = questions.tsurukame;
            break;
        case "profitLoss":
            questionType = questions.profitLoss;
            break;
        case "inference":
            questionType = questions.inference;
            break;
        case "random":
            questionType = questions.random;
            break;
        default:
            throw new Error("questionTypeが不正");
    }
    switch (diff) {
        case "easy":
            diffType = diffList.e;
            break;
        case "normal":
            diffType = diffList.n;
            break;
        case "hard":
            diffType = diffList.h;
            break;
        case "random":
            diffType = diffList.random;
            break;
        default:
            throw new Error("diffが不正");
    }
    if (questionType === questions.random || diffType === diffList.random) {
        randomStart(questionType, diffType, qNum);
    } else {
        start(questionType, diffType, qNum);
    }
    $("#select").html("");
});

const start = async (type: questions, diff: diffList, n: number) => {
    if (!isConvertibleNumber($("#timeLimit").val())) {
        alert("入力値が不正です");
        return;
    }
    const timeLimit: number = Number($("#timeLimit").val());
    if (timeLimit < 1) {
        alert("制限時間が短すぎます");
        return;
    }
    if (timeLimit > Number.MAX_SAFE_INTEGER) {
        alert("制限時間が長すぎます");
        return;
    }
    let question: questionTypes;
    switch (type) {
        case questions.tsurukame:
            question = new Tsurukame();
            break;
        case questions.profitLoss:
            question = new ProfitLoss();
            break;
        case questions.inference:
            question = new Inference();
            break;
        default:
            throw new Error("err3");
    }

    const ansList: boolean[] = [];
    const notTime: boolean = $("#inf").prop("checked");
    for (let i = 1; i <= n; i++) {
        const dic: valueToUse =
            diff === diffList.e
                ? question.easy(i)
                : diff === diffList.n
                ? question.normal(i)
                : question.hard(i);
        if (notTime) {
            await pause();
        } else {
            $("#time").html(`<p>残り${timeLimit}秒</p>`);
            await timeCount(timeLimit);
        }
        if (!isConvertibleNumber($("input[name='ans']:checked").val())) {
            alert("入力値が不正です");
            return;
        }
        const userAns: number = Number($("input[name='ans']:checked").val());
        $("#question").html("");
        $("#ans").html("");
        $("#time").html("");
        const r = await result(userAns, dic, diff, type);
        ansList.push(r);
    }

    let html = "";
    let cnt = 0;
    ansList.forEach((element, i) => {
        if (element) {
            html += `<p>${i + 1}問目 : o</p>`;
            cnt++;
        } else {
            html += `<p>${i + 1}問目 : x</p>`;
        }
    });
    html = `<h3>${n}問中${cnt}問正解</h4>` + html;
    html += `<button onclick="location.href='/'">戻る</button>`;
    $("#result").html(html);
};

const randomStart = async (type: questions, diff: diffList, n: number) => {
    if (!isConvertibleNumber($("#timeLimit").val())) {
        alert("入力値が不正です");
        return;
    }
    const timeLimit: number = Number($("#timeLimit").val());
    if (timeLimit < 1) {
        alert("制限時間が短すぎます");
        return;
    }
    if (timeLimit > Number.MAX_SAFE_INTEGER) {
        alert("制限時間が長すぎます");
        return;
    }
    let question: questionTypes;
    const typeRandom = type === questions.random;
    const diffRandom = diff === diffList.random;
    switch (type) {
        case questions.tsurukame:
            question = new Tsurukame();
            break;
        case questions.profitLoss:
            question = new ProfitLoss();
            break;
        case questions.inference:
            question = new Inference();
            break;
        default:
            [question, type] = randomQuestion();
            break;
    }
    const ansList: boolean[] = [];
    const notTime: boolean = $("#inf").prop("checked");
    for (let i = 1; i <= n; i++) {
        if (typeRandom) {
            [question, type] = randomQuestion();
        }
        if (diffRandom) {
            diff = randomDiff();
        }
        const dic: valueToUse =
            diff === diffList.e
                ? question.easy(i)
                : diff === diffList.n
                ? question.normal(i)
                : question.hard(i);
        if (notTime) {
            await pause();
        } else {
            $("#time").html(`<p>残り${timeLimit}秒</p>`);
            await timeCount(timeLimit);
        }
        const userAns: number = Number($("input[name='ans']:checked").val());
        $("#question").html("");
        $("#ans").html("");
        $("#time").html("");
        const r = await result(userAns, dic, diff, type);
        ansList.push(r);
    }

    let html = "";
    let cnt = 0;
    ansList.forEach((element, i) => {
        if (element) {
            html += `<p>${i + 1}問目 : o</p>`;
            cnt++;
        } else {
            html += `<p>${i + 1}問目 : x</p>`;
        }
    });
    html = `<h3>${n}問中${cnt}問正解</h4>` + html;
    html += `<button onclick="location.href='/'">戻る</button>`;
    $("#result").html(html);
};

const randomQuestion = () => {
    let res: [questionTypes, questions];
    const n = getRandomInt(0, questions.random - 1);
    switch (n) {
        case 0:
            res = [new Tsurukame(), questions.tsurukame];
            break;
        case 1:
            res = [new Inference(), questions.inference];
            break;
        case 2:
            res = [new ProfitLoss(), questions.profitLoss];
            break;
        default:
            res = [new Tsurukame(), questions.tsurukame];
            break;
    }
    return res;
};

const randomDiff = () => {
    let res: diffList;
    const n = getRandomInt(0, diffList.random - 1);
    switch (n) {
        case 0:
            res = diffList.e;
            break;
        case 1:
            res = diffList.n;
            break;
        case 2:
            res = diffList.h;
            break;
        default:
            res = diffList.e;
            break;
    }
    return res;
};

/**
 * question type
 */
enum questions {
    tsurukame,
    inference,
    profitLoss,
    random,
}
