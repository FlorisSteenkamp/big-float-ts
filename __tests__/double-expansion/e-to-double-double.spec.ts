import { describe, expect, it } from '@jest/globals';
import { eToDd } from '../../src/double-expansion/e-to-double-double.js';


describe('`eToDd`', function() {
    it('should correctly convert an Schewchuk floating point expansion to a double-double precision floating point number', 
    function() {
        // A floating point expansion
        let a = [
            -2.234264249842695e-47,
            -1.5415478495136504e-30,
            -3.106903718783877e-13,
            32234.0050348792,
            -316536551706320100000
        ];
        
        expect(eToDd(a)).toEqual([32234.0050348792, -316536551706320100000]);

        expect(eToDd(a.slice(1))).toEqual([32234.0050348792, -316536551706320100000]);
        expect(eToDd(a.slice(2))).toEqual([32234.0050348792, -316536551706320100000]);
        expect(eToDd(a.slice(3))).toEqual([32234.0050348792, -316536551706320100000]);
        expect(eToDd(a.slice(4))).toEqual([0, -316536551706320100000]);

        expect(eToDd(a.slice(0,-1))).toEqual([-3.106903718783877e-13, 32234.0050348792]);
        expect(eToDd(a.slice(0,-2))).toEqual([-1.5415478495136504e-30, -3.106903718783877e-13]);
        expect(eToDd(a.slice(0,-3))).toEqual([-2.234264249842695e-47, -1.5415478495136504e-30]);
        expect(eToDd(a.slice(0,-4))).toEqual([0, -2.234264249842695e-47]);
    });
});
