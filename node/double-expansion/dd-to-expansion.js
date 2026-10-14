/**
 * Returns the result of converting a double-double precision floating point
 * number to a floating point expansion.
 */
function ddToE(dd) {
    if (dd[0] === 0) {
        return [dd[1]];
    }
    return dd; // a double-double already is a valid expansion
}
export { ddToE };
//# sourceMappingURL=dd-to-expansion.js.map