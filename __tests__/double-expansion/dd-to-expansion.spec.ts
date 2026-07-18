import { describe, expect, it } from '@jest/globals';
import { eToDd } from '../../src/double-expansion/e-to-double-double.js';
import { ddToE } from '../../src/double-expansion/dd-to-expansion.js';


describe('`ddToE`', function() {
    it('should round-trip `ddToE` <--> eToDd (double-double with zero low double)', 
    function() {
        const dd = [0, 32234.0050348792];
        const dd_ = eToDd(ddToE(dd));

        expect(dd).toEqual(dd_);

        const e = ddToE(eToDd(dd));
        expect(e).toEqual([32234.0050348792]);
    });
    it('should round-trip `ddToE` <--> eToDd (typical double-double)', 
    function() {
        const dd = [-3.106903718783877e-13, 32234.0050348792];
        const dd_ = eToDd(ddToE(dd));

        expect(dd).toEqual(dd_);

        const e = ddToE(eToDd(dd));
        expect(e).toEqual(dd);
    });
    it('should convert a double-double starting with zero to an expansion', 
    function() {
        const dd = [0, 32234.0050348792];
        const e = ddToE(dd);
        expect(e).toEqual([32234.0050348792]);
    });
    it('should convert a typical double-double to an expansion', 
    function() {
        const dd = [-3.106903718783877e-13, 32234.0050348792];
        const e = ddToE(dd);
        expect(e).toEqual(dd);

    });
});
