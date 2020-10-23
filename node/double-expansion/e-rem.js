"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eRem = void 0;
const e_long_divide_1 = require("./e-long-divide");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eLongDivide = e_long_divide_1.eLongDivide;
/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
function eRem(a, b) {
    return eLongDivide(a, b).rem;
}
exports.eRem = eRem;
//# sourceMappingURL=e-rem.js.map