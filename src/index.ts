export { eToBitlength } from './double-expansion/e-to-bitlength.js';
export { eDiv } from './double-expansion/e-div.js';
export { eLongDivide } from './double-expansion/e-long-divide.js';
export { eIntDiv } from './double-expansion/e-int-div.js';
export { eRem } from './double-expansion/e-rem.js';
export { eCompress } from './double-expansion/e-compress.js';
export { eCompare } from './double-expansion/e-compare.js';
export { eAbs } from './double-expansion/e-abs.js';
export { eEstimate } from './double-expansion/e-estimate.js';
export { eDiff } from './double-expansion/e-diff.js';
export { fastTwoDiff } from './basic/fast-two-diff.js';
export { fastTwoSum } from './basic/fast-two-sum.js';
export { eNegativeOf } from './double-expansion/e-negative-of.js';
export { eMultBy2 } from './double-expansion/e-mult-by-2.js';
export { eMultByNeg2 } from './double-expansion/e-mult-by-neg-2.js';
export { eDivBy2 } from './double-expansion/e-div-by-2.js';
export { split } from './basic/split.js';
export { twoDiff } from './basic/two-diff.js';
export { twoProduct } from './basic/two-product.js';
export { twoSum } from './basic/two-sum.js';
export { reduceSignificand } from './basic/reduce-significand.js';
export { parseDouble, parseDoubleDetailed } from './double-representation/parse-double.js';
export { isBitAligned } from './double-representation/is-bit-aligned.js';
export { msbExponent } from './double-representation/msb-exponent.js';
export { lsbExponent } from './double-representation/lsb-exponent.js';
export { eSign } from './double-expansion/e-sign.js';
export { bitLength } from './double-representation/bit-length.js';
export { expBitLength } from './double-representation/bit-length.js';
export { eCalculate } from './double-expansion/e-calculate.js';
export { eSum } from './double-expansion/e-sum.js';
export { eProduct } from './double-expansion/e-product.js';
export { exponent } from './double-representation/exponent.js';
export { significand } from './double-representation/significand.js';
export { doubleToBinaryString } from './double-representation/double-to-binary-string.js';
export { doubleToOctets } from './double-representation/double-to-octets.js';
export { getHighestSetBit, getLowestSetBit } from './double-representation/get-max-set-bit.js';
export { eIntPow } from './double-expansion/e-int-pow.js';
export { eToDd } from './double-expansion/e-to-double-double.js';
export { orient2d } from './geometric-primitives/orient2d.js';
export { isAdjacent } from './double-expansion/is-adjacent.js';
export { isNonOverlappingAll } from './double-expansion/is-overlapping.js';
export { eIsInteger } from './double-expansion/e-is-integer.js';

// Aliases for some functions which names were not changed due to them being
// used extensively in the literature with a particular recognizable name
export { fastExpansionSum, fastExpansionSum as eAdd } from './double-expansion/fast-expansion-sum.js';
export { growExpansion, growExpansion as eAddDouble } from './double-expansion/grow-expansion.js';
export { scaleExpansion as eMultDouble1, scaleExpansion2 as eMultDouble2 } from './double-expansion/scale-expansion.js';
export { expansionProduct, expansionProduct as eMult } from './double-expansion/expansion-product.js';
