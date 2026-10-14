import { describe, expect, it } from '@jest/globals';
import { twoSquare } from '../../src/basic/two-square.js';
import { twoProduct } from '../../src/basic/two-product.js';


describe('twoSquare', function() {
    it('should return the exact square of a double (identical to `twoProduct(a,a)`)', 
    function() {
        expect(twoSquare(3)).toEqual([0, 9]);
        // (1 + 2^-52)^2 = 1 + 2^-51 + 2^-104
        expect(twoSquare(1 + 2**-52)).toEqual([2**-104, 1 + 2**-51]);

        for (let i=0; i<10000; i++) {
            const a = (Math.random() - 0.5) * 2**Math.floor(Math.random()*200 - 100);
            expect(twoSquare(a)).toEqual(twoProduct(a,a));
        }
    });
});
