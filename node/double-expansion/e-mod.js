"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eMod = void 0;
const e_int_div_1 = require("./e-int-div");
const e_sign_1 = require("./e-sign");
const expansion_product_1 = require("./expansion-product");
const e_diff_1 = require("./e-diff");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eIntDiv = e_int_div_1.eIntDiv;
const eSign = e_sign_1.eSign;
const expansionProduct = expansion_product_1.expansionProduct;
const eDiff = e_diff_1.eDiff;
/**
 * Returns a % b
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
// TODO - improve function
// TODO - more tests
function eMod(a, b) {
    if (eSign(b) === 0) {
        throw new Error('division by zero');
    }
    let r = eIntDiv(a, b);
    return eDiff(a, expansionProduct(b, r));
}
exports.eMod = eMod;
//# sourceMappingURL=e-mod.js.map