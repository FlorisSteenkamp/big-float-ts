/** Number of significant bits in a single limb (limb is in [0, 2^26)). */
function dfLimbBitLength(v) {
    return v === 0
        ? 0
        : 32 - Math.clz32(v);
}
export { dfLimbBitLength };
//# sourceMappingURL=limb-bit-length.js.map