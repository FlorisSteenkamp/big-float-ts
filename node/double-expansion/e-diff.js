"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eDiff = void 0;
const fast_expansion_sum_1 = require("./fast-expansion-sum");
const e_negative_of_1 = require("./e-negative-of");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const negativeOf = e_negative_of_1.eNegativeOf;
const add = fast_expansion_sum_1.fastExpansionSum;
/**
 * Returns the difference between two floating point expansions, i.e. e - f.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function eDiff(e, f) {
    const g = negativeOf(f);
    return add(e, g);
}
exports.eDiff = eDiff;
//# sourceMappingURL=e-diff.js.map