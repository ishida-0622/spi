import $ from "jquery";
import QuestionBase from "./modules/interfaces/questionBase";
import { diffList } from "./modules/enums";
import optHtmlCreate from "./modules/htmlCreate/optHtmlCreate";
import valueToUse from "modules/types/valueToUse";

class WorkCalc implements QuestionBase {
    easy(rep: number): valueToUse {
        throw new Error("Method not implemented.");
    }
    normal(rep: number): valueToUse {
        throw new Error("Method not implemented.");
    }
    hard(rep: number): valueToUse {
        throw new Error("Method not implemented.");
    }
}

export default WorkCalc;
