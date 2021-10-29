
import { eCompress } from "./e-compress.js";


function eIsInteger(a: number[]): boolean {
    a = eCompress(a);

    for (let i=0; i<a.length; i++) {
        if (a[i] % 1 !== 0) {
            return false;
        }
    }

    return true;
}


export { eIsInteger }

