import { dfIsZero } from './is-zero.js';
import { DF_ZERO } from './zero.js';
import { dfAlign } from './align.js';
import { dfAddMagnitude } from './add-magnitude.js';
import { dfSubMagnitude } from './sub-magnitude.js';
import { dfCompareMagnitudeAligned } from './compare-magnitude-aligned.js';
import { dfNormalize } from './helpers/normalize.js';
/**
 * Adds two dyadic floats: a + b.
 * * Exact
 * * Both operands are first aligned to the smaller exponent so the cost (time
 * and memory) is proportional to the difference in exponents, e.g. adding
 * `2^(10^9)` and `1` allocates a mantissa of about 38 million limbs.
 */
function dfAdd(a, b) {
    if (dfIsZero(a)) {
        return { sign: b.sign, mantissa: b.mantissa.slice(), exp: b.exp };
    }
    if (dfIsZero(b)) {
        return { sign: a.sign, mantissa: a.mantissa.slice(), exp: a.exp };
    }
    const { ma, mb, exp } = dfAlign(a, b);
    let result;
    if (a.sign === b.sign) {
        // Same sign: magnitudes add, sign preserved.
        result = { sign: a.sign, mantissa: dfAddMagnitude(ma, mb), exp };
    }
    else {
        // Opposite signs: subtract smaller magnitude from larger.
        const cmp = dfCompareMagnitudeAligned(ma, mb);
        if (cmp === 0) {
            return DF_ZERO; // equal magnitudes cancel to zero
        }
        result = cmp > 0
            ? { sign: a.sign, mantissa: dfSubMagnitude(ma, mb), exp }
            : { sign: b.sign, mantissa: dfSubMagnitude(mb, ma), exp };
    }
    return dfNormalize(result);
}
export { dfAdd };
//# sourceMappingURL=add.js.map