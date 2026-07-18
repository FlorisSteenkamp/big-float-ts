import { describe, expect, it } from '@jest/globals';
import { expansionProduct } from '../../src/double-expansion/expansion-product.js';
import { squares } from 'squares-rng';
import { dfFromDouble } from '../../src/infinite-precision/from-double.js';
import { DyadicFloat } from '../../src/infinite-precision/dyadic-float.js';
import { dfMul } from '../../src/infinite-precision/mul.js';
import { dfToExpansion } from '../../src/infinite-precision/to-expansion.js';
import { eCompress } from '../../src/double-expansion/e-compress.js';


describe('benchmark: expansion product', function() {
    it('1', function() {
        // const N = 1000_000;
        const N = 4;
        const vsA: number[][] = [];     // Schewchuck
        const vsB: DyadicFloat[] = [];  // DyadicFloat
        for (let i=0; i<N; i++) {
            const a = 2*squares(i)/2**32;

            const c = dfFromDouble(a);

            vsA.push([a]);
            vsB.push(c);
        }

        const startA = performance.now();
        for (let i=0; i<vsA.length; i += 4) {
            const v1 = vsA[i];
            const v2 = vsA[i + 1];
            const v3 = vsA[i + 2];
            const v4 = vsA[i + 3];
            const a = expansionProduct(v1, v2);
            const b = expansionProduct(v3, v4);
            const c = expansionProduct(a, b);//?
        }
        const elapsedA = performance.now() - startA;

        const startB = performance.now();
        for (let i=0; i<vsB.length; i += 4) {
            const v1 = vsB[i];
            const v2 = vsB[i + 1];
            const v3 = vsB[i + 2];
            const v4 = vsB[i + 3];

            const a = dfMul(v1, v2);
            const b = dfMul(v3, v4);
            const c = dfMul(a, b);//?
            eCompress(dfToExpansion(c));//?
        }
        const elapsedB = performance.now() - startB;

        console.log(`expansionProduct: ${elapsedA.toFixed(2)} ms`);
        console.log(`mul (DyadicFloat): ${elapsedB.toFixed(2)} ms`);

        // expect(1).toEqual(1);
    });
});