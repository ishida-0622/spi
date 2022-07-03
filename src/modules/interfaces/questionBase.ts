import valueToUse from "../types/valueToUse";

interface QuestionBase {
    easy(rep: number): valueToUse;
    normal(rep: number): valueToUse;
    hard(rep: number): valueToUse;
}

export default QuestionBase;
