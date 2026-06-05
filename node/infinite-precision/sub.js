import { dfAdd } from './add.js';
import { dfNeg } from './neg.js';
/**
 * Subtract: a - b.
 * * exact
 */
function dfSub(a, b) {
    return dfAdd(a, dfNeg(b));
}
export { dfSub };
//# sourceMappingURL=sub.js.map