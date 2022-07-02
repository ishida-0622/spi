import dict from "../types/dict";

interface QuestionBase {
    easy(rep: number): dict;
    normal(rep: number): dict;
    hard(rep: number): dict;
}

export default QuestionBase;
