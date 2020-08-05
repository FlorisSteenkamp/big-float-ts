"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orient2d = exports.significand = exports.exponent = exports.getLowestSetBit = exports.getHighestSetBit = exports.doubleToOctets = exports.doubleToBinaryString = exports.expBitLength = exports.bitLength = exports.lsbExponent = exports.msbExponent = exports.isBitAligned = exports.parseDoubleDetailed = exports.parseDouble = exports.eToDd = exports.eProduct = exports.eSum = exports.eCalculate = exports.eIntPow = exports.eToBitlength = exports.eAbs = exports.eCompare = exports.eSign = exports.eDivBy2 = exports.eMultByNeg2 = exports.eMultBy2 = exports.eNegativeOf = exports.eDiff = exports.eEstimate = exports.eCompress = exports.eMod = exports.eIntDiv = exports.eDiv = exports.eMultDouble2 = exports.scaleExpansion2 = exports.eMultDouble1 = exports.scaleExpansion = exports.eMult = exports.expansionProduct = exports.eAddDouble = exports.growExpansion = exports.eAdd = exports.fastExpansionSum = exports.reduceSignificand = exports.twoSum = exports.twoProduct = exports.twoDiff = exports.split = exports.fastTwoSum = exports.fastTwoDiff = exports.operators = void 0;
const e_to_bitlength_1 = require("./double-expansion/e-to-bitlength");
Object.defineProperty(exports, "eToBitlength", { enumerable: true, get: function () { return e_to_bitlength_1.eToBitlength; } });
const e_div_1 = require("./double-expansion/e-div");
Object.defineProperty(exports, "eDiv", { enumerable: true, get: function () { return e_div_1.eDiv; } });
const e_int_div_1 = require("./double-expansion/e-int-div");
Object.defineProperty(exports, "eIntDiv", { enumerable: true, get: function () { return e_int_div_1.eIntDiv; } });
const e_mod_1 = require("./double-expansion/e-mod");
Object.defineProperty(exports, "eMod", { enumerable: true, get: function () { return e_mod_1.eMod; } });
const e_compress_1 = require("./double-expansion/e-compress");
Object.defineProperty(exports, "eCompress", { enumerable: true, get: function () { return e_compress_1.eCompress; } });
const e_compare_1 = require("./double-expansion/e-compare");
Object.defineProperty(exports, "eCompare", { enumerable: true, get: function () { return e_compare_1.eCompare; } });
const e_abs_1 = require("./double-expansion/e-abs");
Object.defineProperty(exports, "eAbs", { enumerable: true, get: function () { return e_abs_1.eAbs; } });
const e_estimate_1 = require("./double-expansion/e-estimate");
Object.defineProperty(exports, "eEstimate", { enumerable: true, get: function () { return e_estimate_1.eEstimate; } });
const e_diff_1 = require("./double-expansion/e-diff");
Object.defineProperty(exports, "eDiff", { enumerable: true, get: function () { return e_diff_1.eDiff; } });
const fast_expansion_sum_1 = require("./double-expansion/fast-expansion-sum");
Object.defineProperty(exports, "fastExpansionSum", { enumerable: true, get: function () { return fast_expansion_sum_1.fastExpansionSum; } });
const fast_two_diff_1 = require("./basic/fast-two-diff");
Object.defineProperty(exports, "fastTwoDiff", { enumerable: true, get: function () { return fast_two_diff_1.fastTwoDiff; } });
const fast_two_sum_1 = require("./basic/fast-two-sum");
Object.defineProperty(exports, "fastTwoSum", { enumerable: true, get: function () { return fast_two_sum_1.fastTwoSum; } });
const grow_expansion_1 = require("./double-expansion/grow-expansion");
Object.defineProperty(exports, "growExpansion", { enumerable: true, get: function () { return grow_expansion_1.growExpansion; } });
const e_negative_of_1 = require("./double-expansion/e-negative-of");
Object.defineProperty(exports, "eNegativeOf", { enumerable: true, get: function () { return e_negative_of_1.eNegativeOf; } });
const scale_expansion_1 = require("./double-expansion/scale-expansion");
Object.defineProperty(exports, "scaleExpansion", { enumerable: true, get: function () { return scale_expansion_1.scaleExpansion; } });
Object.defineProperty(exports, "scaleExpansion2", { enumerable: true, get: function () { return scale_expansion_1.scaleExpansion2; } });
const e_mult_by_2_1 = require("./double-expansion/e-mult-by-2");
Object.defineProperty(exports, "eMultBy2", { enumerable: true, get: function () { return e_mult_by_2_1.eMultBy2; } });
const e_mult_by_neg_2_1 = require("./double-expansion/e-mult-by-neg-2");
Object.defineProperty(exports, "eMultByNeg2", { enumerable: true, get: function () { return e_mult_by_neg_2_1.eMultByNeg2; } });
const e_div_by_2_1 = require("./double-expansion/e-div-by-2");
Object.defineProperty(exports, "eDivBy2", { enumerable: true, get: function () { return e_div_by_2_1.eDivBy2; } });
const split_1 = require("./basic/split");
Object.defineProperty(exports, "split", { enumerable: true, get: function () { return split_1.split; } });
const two_diff_1 = require("./basic/two-diff");
Object.defineProperty(exports, "twoDiff", { enumerable: true, get: function () { return two_diff_1.twoDiff; } });
const two_product_1 = require("./basic/two-product");
Object.defineProperty(exports, "twoProduct", { enumerable: true, get: function () { return two_product_1.twoProduct; } });
const two_sum_1 = require("./basic/two-sum");
Object.defineProperty(exports, "twoSum", { enumerable: true, get: function () { return two_sum_1.twoSum; } });
const reduce_significand_1 = require("./basic/reduce-significand");
Object.defineProperty(exports, "reduceSignificand", { enumerable: true, get: function () { return reduce_significand_1.reduceSignificand; } });
const expansion_product_1 = require("./double-expansion/expansion-product");
Object.defineProperty(exports, "expansionProduct", { enumerable: true, get: function () { return expansion_product_1.expansionProduct; } });
const parse_double_1 = require("./double-representation/parse-double");
Object.defineProperty(exports, "parseDouble", { enumerable: true, get: function () { return parse_double_1.parseDouble; } });
Object.defineProperty(exports, "parseDoubleDetailed", { enumerable: true, get: function () { return parse_double_1.parseDoubleDetailed; } });
const is_bit_aligned_1 = require("./double-representation/is-bit-aligned");
Object.defineProperty(exports, "isBitAligned", { enumerable: true, get: function () { return is_bit_aligned_1.isBitAligned; } });
const msb_exponent_1 = require("./double-representation/msb-exponent");
Object.defineProperty(exports, "msbExponent", { enumerable: true, get: function () { return msb_exponent_1.msbExponent; } });
const lsb_exponent_1 = require("./double-representation/lsb-exponent");
Object.defineProperty(exports, "lsbExponent", { enumerable: true, get: function () { return lsb_exponent_1.lsbExponent; } });
const e_sign_1 = require("./double-expansion/e-sign");
Object.defineProperty(exports, "eSign", { enumerable: true, get: function () { return e_sign_1.eSign; } });
const bit_length_1 = require("./double-representation/bit-length");
Object.defineProperty(exports, "bitLength", { enumerable: true, get: function () { return bit_length_1.bitLength; } });
const bit_length_2 = require("./double-representation/bit-length");
Object.defineProperty(exports, "expBitLength", { enumerable: true, get: function () { return bit_length_2.expBitLength; } });
const e_calculate_1 = require("./double-expansion/e-calculate");
Object.defineProperty(exports, "eCalculate", { enumerable: true, get: function () { return e_calculate_1.eCalculate; } });
const e_sum_1 = require("./double-expansion/e-sum");
Object.defineProperty(exports, "eSum", { enumerable: true, get: function () { return e_sum_1.eSum; } });
const e_product_1 = require("./double-expansion/e-product");
Object.defineProperty(exports, "eProduct", { enumerable: true, get: function () { return e_product_1.eProduct; } });
const exponent_1 = require("./double-representation/exponent");
Object.defineProperty(exports, "exponent", { enumerable: true, get: function () { return exponent_1.exponent; } });
const significand_1 = require("./double-representation/significand");
Object.defineProperty(exports, "significand", { enumerable: true, get: function () { return significand_1.significand; } });
const double_to_binary_string_1 = require("./double-representation/double-to-binary-string");
Object.defineProperty(exports, "doubleToBinaryString", { enumerable: true, get: function () { return double_to_binary_string_1.doubleToBinaryString; } });
const double_to_octets_1 = require("./double-representation/double-to-octets");
Object.defineProperty(exports, "doubleToOctets", { enumerable: true, get: function () { return double_to_octets_1.doubleToOctets; } });
const get_max_set_bit_1 = require("./double-representation/get-max-set-bit");
Object.defineProperty(exports, "getHighestSetBit", { enumerable: true, get: function () { return get_max_set_bit_1.getHighestSetBit; } });
Object.defineProperty(exports, "getLowestSetBit", { enumerable: true, get: function () { return get_max_set_bit_1.getLowestSetBit; } });
const e_int_pow_1 = require("./double-expansion/e-int-pow");
Object.defineProperty(exports, "eIntPow", { enumerable: true, get: function () { return e_int_pow_1.eIntPow; } });
const e_to_double_double_1 = require("./double-expansion/e-to-double-double");
Object.defineProperty(exports, "eToDd", { enumerable: true, get: function () { return e_to_double_double_1.eToDd; } });
const orient2d_1 = require("./geometric-primitives/orient2d");
Object.defineProperty(exports, "orient2d", { enumerable: true, get: function () { return orient2d_1.orient2d; } });
// Aliases for some functions which names were not changed due to them being
// used extensively in the literature with a particular recognizable name
const eAdd = fast_expansion_sum_1.fastExpansionSum;
exports.eAdd = eAdd;
const eAddDouble = grow_expansion_1.growExpansion;
exports.eAddDouble = eAddDouble;
const eMult = expansion_product_1.expansionProduct;
exports.eMult = eMult;
const eMultDouble1 = scale_expansion_1.scaleExpansion;
exports.eMultDouble1 = eMultDouble1;
const eMultDouble2 = scale_expansion_1.scaleExpansion2;
exports.eMultDouble2 = eMultDouble2;
const operators = {
    //---- basic ----//
    fastTwoDiff: fast_two_diff_1.fastTwoDiff,
    fastTwoSum: fast_two_sum_1.fastTwoSum,
    split: split_1.split,
    twoDiff: two_diff_1.twoDiff,
    twoProduct: two_product_1.twoProduct,
    twoSum: two_sum_1.twoSum,
    reduceSignificand: reduce_significand_1.reduceSignificand,
    //---- double floating point expansions ----//
    fastExpansionSum: fast_expansion_sum_1.fastExpansionSum, eAdd,
    growExpansion: grow_expansion_1.growExpansion, eAddDouble,
    expansionProduct: expansion_product_1.expansionProduct, eMult,
    scaleExpansion: scale_expansion_1.scaleExpansion, eMultDouble1,
    scaleExpansion2: scale_expansion_1.scaleExpansion2, eMultDouble2,
    eDiv: e_div_1.eDiv,
    eIntDiv: e_int_div_1.eIntDiv,
    eMod: e_mod_1.eMod,
    eCompress: e_compress_1.eCompress,
    eEstimate: e_estimate_1.eEstimate,
    eDiff: e_diff_1.eDiff,
    eNegativeOf: e_negative_of_1.eNegativeOf,
    eMultBy2: e_mult_by_2_1.eMultBy2,
    eMultByNeg2: e_mult_by_neg_2_1.eMultByNeg2,
    eDivBy2: e_div_by_2_1.eDivBy2,
    eSign: e_sign_1.eSign,
    eCompare: e_compare_1.eCompare,
    eAbs: e_abs_1.eAbs,
    eToBitlength: e_to_bitlength_1.eToBitlength,
    eIntPow: e_int_pow_1.eIntPow,
    eCalculate: e_calculate_1.eCalculate,
    eSum: e_sum_1.eSum,
    eProduct: e_product_1.eProduct,
    eToDd: e_to_double_double_1.eToDd,
    //---- double floating point representation ----//
    parseDouble: parse_double_1.parseDouble,
    parseDoubleDetailed: parse_double_1.parseDoubleDetailed,
    isBitAligned: is_bit_aligned_1.isBitAligned,
    msbExponent: msb_exponent_1.msbExponent,
    lsbExponent: lsb_exponent_1.lsbExponent,
    bitLength: bit_length_1.bitLength,
    expBitLength: bit_length_2.expBitLength,
    doubleToBinaryString: double_to_binary_string_1.doubleToBinaryString,
    doubleToOctets: double_to_octets_1.doubleToOctets,
    getHighestSetBit: get_max_set_bit_1.getHighestSetBit,
    getLowestSetBit: get_max_set_bit_1.getLowestSetBit,
    exponent: exponent_1.exponent,
    significand: significand_1.significand,
    //---- geometric primitives
    orient2d: orient2d_1.orient2d
};
exports.operators = operators;
//# sourceMappingURL=index.js.map