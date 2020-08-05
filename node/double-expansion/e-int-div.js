"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eIntDiv = void 0;
const e_div_1 = require("./e-div");
const e_sign_1 = require("./e-sign");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eDiv = e_div_1.eDiv;
const eSign = e_sign_1.eSign;
/**
 * Returns the result of the integer division a/b.
 *
 * * **precondition:** a and b must be integers, b !== 0
 */
// TODO - improve function
// TODO - more tests
function eIntDiv(N, D) {
    if (eSign(D) === 0) {
        throw new Error('division by zero');
    }
    let _r = eDiv(N, D, Math.max(N.length, D.length));
    let r = [];
    for (let i = 0; i < _r.length; i++) {
        let v = Math.trunc(_r[i]);
        if (v !== 0) {
            r.push(v);
        }
    }
    return r;
}
exports.eIntDiv = eIntDiv;
//# sourceMappingURL=e-int-div.js.map