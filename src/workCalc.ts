import $ from "jquery";
import { q } from "./modules/interface";
import { diffList } from "./modules/enums";
import optHtmlCreate from "./modules/htmlCreate/optHtmlCreate";
import dict from "modules/types/dict";

class WorkCalc implements q {
    easy(rep: number): dict {
        throw new Error("Method not implemented.");
    }
    normal(rep: number): dict {
        throw new Error("Method not implemented.");
    }
    hard(rep: number): dict {
        throw new Error("Method not implemented.");
    }
}

export default WorkCalc;
