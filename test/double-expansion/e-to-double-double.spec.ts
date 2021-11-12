
import { expect } from 'chai';
import { describe } from 'mocha';

import { eToDd } from '../../src/index.js';


describe('', function() {
	it('should ', 
	function() {
        // A floating point expansion
        let a = [
            -2.234264249842695e-47,
            -1.5415478495136504e-30,
            -3.106903718783877e-13,
            32234.0050348792,
            -316536551706320100000
        ];
        
        expect(eToDd(a)).to.eql([32234.0050348792, -316536551706320100000]);

        expect(eToDd(a.slice(1))).to.eql([32234.0050348792, -316536551706320100000]);
        expect(eToDd(a.slice(2))).to.eql([32234.0050348792, -316536551706320100000]);
        expect(eToDd(a.slice(3))).to.eql([32234.0050348792, -316536551706320100000]);
        expect(eToDd(a.slice(4))).to.eql([0, -316536551706320100000]);

        expect(eToDd(a.slice(0,-1))).to.eql([-3.106903718783877e-13, 32234.0050348792]);
        expect(eToDd(a.slice(0,-2))).to.eql([-1.5415478495136504e-30, -3.106903718783877e-13]);
        expect(eToDd(a.slice(0,-3))).to.eql([-2.234264249842695e-47, -1.5415478495136504e-30]);
        expect(eToDd(a.slice(0,-4))).to.eql([0, -2.234264249842695e-47]);
    });
});
