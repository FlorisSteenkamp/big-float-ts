/**
 * Arbitrary-precision dyadic floating-point number — core representation.
 *
 * A value is represented as:
 *
 *      x = (-1)^sign * mantissa * 2^exp
 *
 * where:
 *  - sign     : 0 for non-negative, 1 for negative.
 *  - mantissa : a non-negative arbitrary-precision integer stored as an
 *               array of base-2^LIMB_BITS "limbs", little-endian
 *               (mantissa[0] is least significant). Each limb is an integer
 *               in [0, 2^LIMB_BITS) held inside a double.
 *  - exp      : an integer power-of-two scale, completely decoupled from the
 *               mantissa. This is what removes the overflow/underflow defect
 *               of a Shewchuk expansion: the exponent is no longer pinned to
 *               the double range.
 *
 * Because the values are dyadic (denominator is always a power of two),
 * addition, subtraction and multiplication are EXACT and closed in this
 * representation. Only division requires rounding.
 *
 * Limbs use radix 2^26 so that the product of any two limbs is < 2^52 and is
 * therefore exactly representable in a double — schoolbook multiplication and
 * carry propagation can be done entirely in floating point.
 */
/** Number of value bits per limb. 26 keeps limb*limb < 2^52 (exact in a double). */
declare const LIMB_BITS = 26;
/** Radix of a single limb: 2^LIMB_BITS. */
declare const LIMB_BASE: number;
/**
 * An arbitrary-precision dyadic float: (-1)^sign * mantissa * 2^exp.
 */
interface DyadicFloat {
    /** 0 => non-negative, 1 => negative. */
    readonly sign: number;
    /** Non-negative integer significand, base-2^LIMB_BITS, little-endian. */
    readonly mantissa: number[];
    /** Integer power-of-two scale. */
    readonly exp: number;
}
export type { DyadicFloat };
export { LIMB_BITS, LIMB_BASE };
