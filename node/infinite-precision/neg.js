import { dfIsZero } from './is-zero.js';
import { DF_ZERO } from './zero.js';
/**
 * Returns the negative of the given `DyadicFloat`.
 */
function dfNeg(x) {
    if (dfIsZero(x)) {
        return DF_ZERO;
    }
    return {
        sign: x.sign ^ 1,
        mantissa: x.mantissa.slice(),
        exp: x.exp
    };
}
export { dfNeg };
//# sourceMappingURL=neg.js.map