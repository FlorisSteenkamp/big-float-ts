
import { eIntDiv as eIntDiv_ } from "./e-int-div";
import { eSign as eSign_ } from "./e-sign";
import { expansionProduct as expansionProduct_ } from "./expansion-product";
import { eDiff as eDiff_ } from "./e-diff";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗
const eIntDiv = eIntDiv_;
const eSign = eSign_;
const expansionProduct = expansionProduct_;
const eDiff = eDiff_;


/**
 * Returns a % b
 * 
 * * **precondition:** a and b must be integers, b !== 0
 */
// TODO - improve function
// TODO - more tests
function eMod(
        a: number[], b: number[]) {

    if (eSign(b) === 0) {
        throw new Error('division by zero');
    }            

    let r = eIntDiv(a,b);

    return eDiff(a, expansionProduct(b,r));
}


export { eMod }
