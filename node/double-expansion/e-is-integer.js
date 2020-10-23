"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eIsInteger = void 0;
const e_compress_1 = require("./e-compress");
function eIsInteger(a) {
    a = e_compress_1.eCompress(a);
    for (let i = 0; i < a.length; i++) {
        if (a[i] % 1 !== 0) {
            return false;
        }
    }
    return true;
}
exports.eIsInteger = eIsInteger;
//# sourceMappingURL=e-is-integer.js.map