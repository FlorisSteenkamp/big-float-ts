import { eLongDivide } from "./e-long-divide.js"


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
