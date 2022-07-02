import RequireOne from "./requireOne";

type dict = RequireOne<{
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

export default dict;
