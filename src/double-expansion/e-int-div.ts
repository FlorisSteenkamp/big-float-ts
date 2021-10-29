
import { eLongDivide as eLongDivide_ } from "./e-long-divide.js"

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eLongDivide = eLongDivide_;


/**
 * Returns the result of the integer division a/b. 
 * 
 * * **precondition:** a and b must be integers, b !== 0
 */
function eIntDiv(
        a: number[], b: number[]): number[] {

    return eLongDivide(a,b).div;
}


export { eIntDiv }
