// Modified from https://github.com/bartaz/ieee754-visualization/
// under the MIT license
// Copyright 2013 Bartek Szopka (original author)
import { doubleView } from "./double-view.js";
/**
 * Returns the ieee-574 8 bytes composing the given double, starting from the
 * sign bit and ending in the lsb of the significand.
 * e.g. 123.456 -> [64, 94, 221, 47, 26, 159, 190, 119]
 */
function doubleToOctets(number) {
    doubleView.setFloat64(0, number, false);
    const octets = [];
    for (let i = 0; i < 8; i++) {
        octets.push(doubleView.getUint8(i));
    }
    return octets;
}
export { doubleToOctets };
//# sourceMappingURL=double-to-octets.js.map