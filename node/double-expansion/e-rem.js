import { eLongDivide as eLongDivide_ } from "./e-long-divide.js";
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eLongDivide = eLongDivide_;
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