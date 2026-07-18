import { eLongDivide } from "./e-long-divide.js";
/**
 * Returns the result of the integer division a/b.
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eIntDiv(a, b) {
    return eLongDivide(a, b).div;
}
export { eIntDiv };
//# sourceMappingURL=e-int-div.js.map