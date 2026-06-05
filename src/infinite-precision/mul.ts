import { LIMB_BASE } from './dyadic-float.js';
import type { DyadicFloat } from './dyadic-float.js';
import { dfIsZero } from './is-zero.js';
import { dfNormalize } from './helpers/normalize.js';
import { DF_ZERO } from './zero.js';

/**
 * Multiply: a * b. Exact.
 *
 * Schoolbook O(n*m) multiply. Each partial product a[i]*b[j] < 2^52 so it is
 * exact in a double; carries are propagated as we go and finished off by
 * `normalize`.
 *
 * TODO: consider a Karatsuba threshold for large operands.
 */
function dfMul(
        a: DyadicFloat,
        b: DyadicFloat): DyadicFloat {

    if (dfIsZero(a) || dfIsZero(b)) {
        return DF_ZERO;
    }

    const ma = a.mantissa;
    const mb = b.mantissa;
    const out: number[] = new Array(ma.length + mb.length).fill(0);

    for (let i = 0; i < ma.length; i++) {
        const ai = ma[i];
        if (ai === 0) continue;
        let carry = 0;
        for (let j = 0; j < mb.length; j++) {
            const v = out[i + j] + ai * mb[j] + carry;
            const low = v % LIMB_BASE;
            out[i + j] = low;
            carry = (v - low) / LIMB_BASE;
        }
        out[i + mb.length] += carry;
    }

    return dfNormalize({
        sign: a.sign ^ b.sign,
        mantissa: out,
        exp: a.exp + b.exp,
    });
}


export { dfMul }
