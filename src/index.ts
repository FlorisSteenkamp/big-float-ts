import { eToBitlength } from './double-expansion/e-to-bitlength.js';
import { eDiv } from './double-expansion/e-div.js';
import { eLongDivide } from './double-expansion/e-long-divide.js';
import { eIntDiv } from './double-expansion/e-int-div.js';
import { eRem } from './double-expansion/e-rem.js';
import { eCompress } from './double-expansion/e-compress.js';
import { eCompare } from './double-expansion/e-compare.js';
import { eAbs } from './double-expansion/e-abs.js';
import { eEstimate } from './double-expansion/e-estimate.js';
import { eDiff } from './double-expansion/e-diff.js';
import { fastExpansionSum } from './double-expansion/fast-expansion-sum.js';
import { fastTwoDiff } from './basic/fast-two-diff.js';
import { fastTwoSum } from './basic/fast-two-sum.js';
import { growExpansion } from './double-expansion/grow-expansion.js';
import { eNegativeOf } from './double-expansion/e-negative-of.js';
import { scaleExpansion, scaleExpansion2 } from './double-expansion/scale-expansion.js';
import { eMultBy2 } from './double-expansion/e-mult-by-2.js';
import { eMultByNeg2 } from './double-expansion/e-mult-by-neg-2.js';
import { eDivBy2 } from './double-expansion/e-div-by-2.js';
import { split } from './basic/split.js';
import { twoDiff } from './basic/two-diff.js';
import { twoProduct } from './basic/two-product.js';
import { twoSum } from './basic/two-sum.js';
import { reduceSignificand } from './basic/reduce-significand.js';
import { expansionProduct } from './double-expansion/expansion-product.js';
import { parseDouble, parseDoubleDetailed } from './double-representation/parse-double.js';
import { isBitAligned } from './double-representation/is-bit-aligned.js';
import { msbExponent } from './double-representation/msb-exponent.js';
import { lsbExponent } from './double-representation/lsb-exponent.js';
import { eSign } from './double-expansion/e-sign.js';
import { bitLength } from './double-representation/bit-length.js';
import { expBitLength } from './double-representation/bit-length.js';
import { eCalculate } from './double-expansion/e-calculate.js';
import { eSum } from './double-expansion/e-sum.js';
import { eProduct } from './double-expansion/e-product.js';
import { exponent } from './double-representation/exponent.js';
import { significand } from './double-representation/significand.js';
import { doubleToBinaryString } from './double-representation/double-to-binary-string.js';
import { doubleToOctets } from './double-representation/double-to-octets.js';
import { getHighestSetBit, getLowestSetBit } from './double-representation/get-max-set-bit.js';
import { eIntPow } from './double-expansion/e-int-pow.js';
import { eToDd } from './double-expansion/e-to-double-double.js';
import { orient2d } from './geometric-primitives/orient2d.js';
import { isAdjacent } from './double-expansion/is-adjacent.js';
import { isNonOverlappingAll } from './double-expansion/is-overlapping.js';
import { eIsInteger } from './double-expansion/e-is-integer.js';


// Aliases for some functions which names were not changed due to them being
// used extensively in the literature with a particular recognizable name
const eAdd = fastExpansionSum;
const eAddDouble = growExpansion;
const eMult = expansionProduct;
const eMultDouble1 = scaleExpansion;
const eMultDouble2 = scaleExpansion2;


const operators = {
    //---- basic ----//
    fastTwoDiff,
    fastTwoSum,
    split,
    twoDiff,
    twoProduct,
    twoSum,
    reduceSignificand,

    //---- double floating point expansions ----//
    fastExpansionSum,  eAdd,
    growExpansion,     eAddDouble,
    expansionProduct,  eMult,
    scaleExpansion,    eMultDouble1,
    scaleExpansion2,   eMultDouble2,
    eDiv,
    eLongDivide,
    eIntDiv,
    eRem,
	eCompress,
    eEstimate,
    eDiff,
    eNegativeOf,
    eMultBy2,
    eMultByNeg2,
    eDivBy2,
    eSign,
    eCompare,
    eAbs,
    eToBitlength,
    eIntPow,
    eCalculate,
    eSum,
    eProduct,
    eToDd,

    //---- double floating point representation ----//
    parseDouble, 
    parseDoubleDetailed,
	isBitAligned,
	msbExponent,
	lsbExponent,
    bitLength,
    expBitLength,
    doubleToBinaryString,
    doubleToOctets, 
    getHighestSetBit, 
    getLowestSetBit,
    exponent, 
    significand,

    //---- geometric primitives
    orient2d,

    //---- others
    isAdjacent, 
    isNonOverlappingAll,
    eIsInteger
};


export { operators }


export {
    //---- basic ----//
    fastTwoDiff,
    fastTwoSum,
    split,
    twoDiff,
    twoProduct,
    twoSum,
    reduceSignificand,

    //---- double floating point expansions ----//
    fastExpansionSum,  eAdd,
    growExpansion,     eAddDouble,
    expansionProduct,  eMult,
    scaleExpansion,    eMultDouble1,
    scaleExpansion2,   eMultDouble2,
    eDiv,
    eLongDivide,
    eIntDiv,
    eRem,
	eCompress,
    eEstimate,
    eDiff,
    eNegativeOf,
    eMultBy2,
    eMultByNeg2,
    eDivBy2,
    eSign,
    eCompare,
    eAbs,
    eToBitlength,
    eIntPow,
    eCalculate,
    eSum,
    eProduct,
    eToDd,

    //---- double floating point representation ----//
    parseDouble, 
    parseDoubleDetailed,
	isBitAligned,
	msbExponent,
	lsbExponent,
    bitLength,
    expBitLength,
    doubleToBinaryString,
    doubleToOctets, 
    getHighestSetBit, 
    getLowestSetBit,
    exponent, 
    significand,

    //---- geometric primitives
    orient2d,

    //---- others
    isAdjacent, 
    isNonOverlappingAll,
    eIsInteger
}
