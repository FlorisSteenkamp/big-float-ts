import { eLongDivide } from "./e-long-divide.js"


/**
 * Returns a % b
 * 
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(
        a: number[], b: number[]): number[] {

    return eLongDivide(a,b).rem;
}


export { eRem }
