/**
 * The canonical zero: `{ sign: 0, mantissa: [], exp: 0 }`.
 *
 * * frozen (also its mantissa) since it is shared by all functions returning
 * zero
 */
const DF_ZERO = Object.freeze({
    sign: 0,
    mantissa: Object.freeze([]),
    exp: 0
});
export { DF_ZERO };
//# sourceMappingURL=zero.js.map