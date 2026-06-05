/**
 * Compare two aligned magnitude limb arrays (same exponent assumed).
 * Returns -1, 0 or 1 for a<b, a==b, a>b respectively.
 */
function dfCompareMagnitudeAligned(a, b) {
    if (a.length !== b.length) {
        return a.length < b.length ? -1 : 1;
    }
    for (let i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i]) {
            return a[i] < b[i] ? -1 : 1;
        }
    }
    return 0;
}
export { dfCompareMagnitudeAligned };
//# sourceMappingURL=compare-magnitude-aligned.js.map