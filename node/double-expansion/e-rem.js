import { eLongDivide } from "./e-long-divide.js";
/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(a, b) {
    return eLongDivide(a, b).rem;
}
export { eRem };
//# sourceMappingURL=e-rem.js.map