
import { eToBitlength } from './double-expansion/e-to-bitlength';
import { eDiv } from './double-expansion/e-div';
import { eCompress } from './double-expansion/e-compress';
import { eCompare } from './double-expansion/e-compare';
import { eAbs } from './double-expansion/e-abs';
import { eEstimate } from './double-expansion/e-estimate';
import { eDiff } from './double-expansion/e-diff';
import { fastExpansionSum } from './double-expansion/fast-expansion-sum';
import { fastTwoDiff } from './basic/fast-two-diff';
import { fastTwoSum } from './basic/fast-two-sum';
import { growExpansion } from './double-expansion/grow-expansion';
import { eNegativeOf } from './double-expansion/e-negative-of';
import { scaleExpansion, scaleExpansion2 } from './double-expansion/scale-expansion';
import { eMultBy2 } from './double-expansion/e-mult-by-2';
import { eMultByNeg2 } from './double-expansion/e-mult-by-neg-2';
import { eDivBy2 } from './double-expansion/e-div-by-2';
import { split } from './basic/split';
import { twoDiff } from './basic/two-diff';
import { twoProduct } from './basic/two-product';
import { twoSum } from './basic/two-sum';
import { reduceSignificand } from './basic/reduce-significand';
import { expansionProduct } from './double-expansion/expansion-product';
import { parseDouble, parseDoubleDetailed } from './double-representation/parse-double';
import { isBitAligned } from './double-representation/is-bit-aligned';
import { msbExponent } from './double-representation/msb-exponent';
import { lsbExponent } from './double-representation/lsb-exponent';
import { eSign } from './double-expansion/e-sign';
import { bitLength } from './double-representation/bit-length';
import { expBitLength } from './double-representation/bit-length';
import { eCalculate } from './double-expansion/e-calculate';
import { eSum } from './double-expansion/e-sum';
import { eProduct } from './double-expansion/e-product';
import { exponent } from './double-representation/exponent';
import { significand } from './double-representation/significand';
import { doubleToBinaryString } from './double-representation/double-to-binary-string';
import { doubleToOctets } from './double-representation/double-to-octets';
import { getHighestSetBit, getLowestSetBit } from './double-representation/get-max-set-bit';
import { eIntPow } from './double-expansion/e-int-pow';
import { eToDd } from './double-expansion/e-to-double-double';
import { orient2d } from './geometric-primitives/orient2d';


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
    orient2d
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
    orient2d
}
