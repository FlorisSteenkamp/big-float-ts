/**
 * Returns the result of dividing a floating point expansion by 2.
 * * **error free**
 *
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eDivBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(0.5 * e[i]);
    }
    return e_;
}
export { eDivBy2 };
//# sourceMappingURL=e-div-by-2.js.map