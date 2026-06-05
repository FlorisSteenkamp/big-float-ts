import type { DyadicFloat } from './dyadic-float.js';
import { dfAdd } from './add.js';
import { dfNeg } from './neg.js';


/**
 * Subtract: a - b.
 * * exact
 */
function dfSub(
        a: DyadicFloat,
        b: DyadicFloat): DyadicFloat {

    return dfAdd(a, dfNeg(b));
}


export { dfSub }
