"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdjacent = void 0;
const is_overlapping_1 = require("./is-overlapping");
/**
 * Returns true if x and y are adjacent, false otherwise.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * for details
 *
 * @param x a double floating point number
 * @param y another double floating point number
 */
function isAdjacent(x, y) {
    return (0, is_overlapping_1.isOverlapping)(x, y) ||
        (0, is_overlapping_1.isOverlapping)(x, 2 * y) ||
        (0, is_overlapping_1.isOverlapping)(2 * x, y);
}
exports.isAdjacent = isAdjacent;
//# sourceMappingURL=is-adjacent.js.map