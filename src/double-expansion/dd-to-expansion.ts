
/**
 * Returns the result of converting a double-double precision floating point
 * number to a floating point expansion.
 */
function ddToE(dd: number[]) {
    if (dd[0] === 0) {
        return [dd[1]];
    }

    return dd; // return only most significant parts
}


export { ddToE }
