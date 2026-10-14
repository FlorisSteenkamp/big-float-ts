
/**
 * Returns the result of merging an expansion e and f into a single expansion, 
 * in order of nondecreasing magnitude (possibly with interspersed zeros). 
 * (This function is zero-eliminating)
 * 
 * * see [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * 
 * @param e a floating point expansion
 * @param f another floating point expansion
 */
function merge(e: number[], f: number[]) {
    const lenE = e.length;
    const lenF = f.length;

    let i = 0;
    let j = 0;

    const merged: number[] = [];

    while (i < lenE && j < lenF) {
        if (e[i] === 0) { i++; continue; }
        if (f[j] === 0) { j++; continue; }

        if (Math.abs(e[i]) <= Math.abs(f[j])) {
            merged.push(e[i]);
            i++;
        } else {
            merged.push(f[j]);
            j++;
        }
    }

    while (i < lenE) {
        merged.push(e[i]);
        i++;
    }

    while (j < lenF) {
        merged.push(f[j]);
        j++;
    }

    if (merged.length === 0) { 
        return [0]; 
    }

    return merged;
}


export { merge }
