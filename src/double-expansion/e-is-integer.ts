
/**
 * Returns `true` if the given floating point expansion represents an integer,
 * `false` otherwise.
 *
 * * no compression is required: since the components are nonoverlapping, the
 * lowest set bit of the sum is the lowest set bit of the smallest nonzero
 * component, so the sum is an integer iff every component is
 *
 * @param a a floating point expansion
 */
function eIsInteger(a: number[]): boolean {
    for (let i=0; i<a.length; i++) {
        if (a[i] % 1 !== 0) {
            return false;
        }
    }

    return true;
}


export { eIsInteger }
