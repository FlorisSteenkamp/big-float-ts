"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eToDd = void 0;
const e_compress_1 = require("./e-compress");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const compress = e_compress_1.eCompress;
/**
 * Returns the result of converting a floating point expansion to a
 * double-double precision floating point number.
 */
function eToDd(e) {
    e = compress(e);
    const len = e.length;
    if (len === 2) {
        return e; // already a double-double
    }
    else if (len === 1) {
        return [0, e[0]]; // double-doubles have a fixed length of 2
    }
    return [e[len - 2], e[len - 1]]; // return only most significant parts
}
exports.eToDd = eToDd;
//# sourceMappingURL=e-to-double-double.js.map