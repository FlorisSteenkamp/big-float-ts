/**
 * Returns the sign of the given expansion such that a negative value means a
 * negative sign and a positive value means a positive sign, 0 meaning 0 of
 * course.
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * From Shewchuk: "A nonoverlapping expansion is desirable because it is easy to
 * determine its sign (take the sign of the largest component) ... "
 *
 * @param e A floating point expansion with zeroes eliminated.
 */
function eSign(e) {
    return e[e.length - 1];
}
export { eSign };
//# sourceMappingURL=e-sign.js.map