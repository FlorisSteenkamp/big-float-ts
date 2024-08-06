import { fastExpansionSum } from "../src/double-expansion/fast-expansion-sum.js";
import { expansionProduct } from "../src/double-expansion/expansion-product.js";
import { randomCenteredAt0, randomOnGrid } from "./random-on-grid.js";



function a(s: number, n: number) {
    let prod = [1];
    for (let i=s; i<n; i++) {
        const v = randomCenteredAt0(2**10,i);
        prod = expansionProduct(prod,[v]);
    }
    return prod;
}


function b() {
    const vs: number[][] = [];
    for (let i=0; i<1000_000; i++) {
        vs.push(a(i*5, (i+1)*5));
    }
    return vs;
}


function cold() {
    const vs = b();
    
    console.time('fastExpansionSum');
    // let sum = [0];
    for (let i=0; i<vs.length-1; i++) {
        fastExpansionSum(vs[i],vs[i+1]);
    }
    console.timeEnd("fastExpansionSum");
}


function hot() {
    setTimeout(cold, 100);
}


function d() {
    const v = a(10,20);
    console.log(v);
}


d();
cold();
hot();