import { describe, expect, it } from '@jest/globals';
import { eSign } from '../../src/double-expansion/e-sign.js';


describe('eign', function() {
    it('should correctly return the sign of some floating point expansions', 
    function() {
        // Some floating point expansions
        let a = [-4.357806199228875e-10, 11_638_607.274152497];
        let b = [8.661162134715461e-10, 9_722_431.969870245];
        let c = [4.511949494578893e-11, -2_797_357.2918064594];

        expect(eSign(a)).toBeGreaterThan(0);
        expect(eSign(b)).toBeGreaterThan(0);
        expect(eSign(c)).toBeLessThan(0);
    });
});
