/**
 * Returns the result of multiplying a floating point expansion by 2.
 * * **error free**
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 *
 * @param e a floating point expansion
 */
function eMultBy2(e) {
    const e_ = [];
    for (let i = 0; i < e.length; i++) {
        e_.push(2 * e[i]);
    }
    return e_;
}
export { eMultBy2 };
//# sourceMappingURL=e-mult-by-2.js.map