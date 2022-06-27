import inference from "../inference";
import profitLoss from "../profitLoss";
import tsurukame from "../tsurukame";

// 参考 https://qiita.com/uhyo/items/80ce7c00f413c1d1be56
type Append<Elm, T extends unknown[]> = ((
    arg: Elm,
    ...rest: T
) => void) extends (...args: infer T2) => void
    ? T2
    : never;

export type AtLeast<N extends number, T> = AtLeastRec<N, T, T[], []>;

type AtLeastRec<Num, Elm, T extends unknown[], C extends unknown[]> = {
    0: T;
    1: AtLeastRec<Num, Elm, Append<Elm, T>, Append<unknown, C>>;
}[C extends { length: Num } ? 0 : 1];

// 参考 https://qiita.com/uhyo/items/583ddf7af3b489d5e8e9
export type RequireOne<T, K extends keyof T = keyof T> = K extends keyof T
    ? PartialRequire<T, K>
    : never;
type PartialRequire<O, K extends keyof O> = {
    [P in K]-?: O[P];
} & O;

export type questionTypes = tsurukame | inference | profitLoss;

export type dict = RequireOne<{
    /**鶴亀算*/
    tsurukame?: {
        ans: number;
        apple: number;
        appleValues: number;
        orange: number;
        orangeValues: number;
        banana?: number;
        bananaValues?: number;
        sum: number;
        sumValues: number;
        /**問題文のHTML*/
        html: string;
    };
    /**推論*/
    inference?: {
        ans: number;
        arr: string[];
        a: number;
        b: number;
        c: number;
        d: number;
        e?: number;
        /**問題文のHTML*/
        html: string;
    };
    /**損益算*/
    profitLoss?: {
        ans: number;
        /**原価*/
        cost: number;
        /**利益率*/
        profit: number;
        /**定価*/
        regular: number;
        /**割引率*/
        discount: number;
        /**最終的な売値*/
        selling: number;
        /**問題文のHTML*/
        html: string;
    };
}>;
