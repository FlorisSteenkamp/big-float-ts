
/**
 * Returns the result of dividing a floating point expansion by 2.
 * * **error free** unless underflow occurs (a subnormal component may lose its lowest bit)
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 */
function eDivBy2(e: number[]) {
    const e_: number[] = [];
    for (let i=0; i<e.length; i++) {
        e_.push(0.5*e[i]);
    }

    return e_;
}


export { eDivBy2 }
