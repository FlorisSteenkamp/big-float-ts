import { describe, expect, it } from '@jest/globals';
import { DF_ZERO } from '../../src/infinite-precision/zero.js';
import { dfIsZero } from '../../src/infinite-precision/is-zero.js';


describe('DF_ZERO', function() {
    it('should be a canonical zero (empty mantissa, sign 0, exp 0)',
    function() {
        expect(DF_ZERO).toEqual({ sign: 0, mantissa: [], exp: 0 });
    });

    it('should be recognised as zero by dfIsZero',
    function() {
        expect(dfIsZero(DF_ZERO)).toBe(true);
    });
});
