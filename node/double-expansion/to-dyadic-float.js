import { dfFromDouble } from '../infinite-precision/from-double.js';
import { dfAdd } from '../infinite-precision/add.js';
import { DF_ZERO } from '../infinite-precision/zero.js';
/**
 * Convert a Shewchuk floating-point expansion to a DyadicFloat.
 *
 * The expansion's exact value is the sum of its components; this conversion is
 * exact since every finite double is an exact dyadic number and dyadic
 * addition is closed and exact.
 *
 * The components need not be nonoverlapping or sorted — any array of finite
 * doubles is accepted and its exact sum is returned.
 *
 * @param e a floating point expansion
 */
function toDyadicFloat(e) {
    let acc = DF_ZERO;
    for (let i = 0; i < e.length; i++) {
        acc = dfAdd(acc, dfFromDouble(e[i]));
    }
    return acc;
}
export { toDyadicFloat };
//# sourceMappingURL=to-dyadic-float.js.map