import { assert, expect } from 'chai';
import { describe } from 'mocha';
import { twoSum, eRem, eMult } from '../../node/index.js';


describe('eRem', function() {
	it('should divide two numbers', 
	function() {
        {
			let a = [2458624];
			let b = [784];
			let res = eRem(a,b);
			expect(res).to.eql([
				-0
			]);
        }

		{
			// 6.596335828304291 === 110668151*2**-24
			// 0.000017464160919189453 === 293*2**-24
			// 110668151 / 293 === 377707
			// => 6.596335828304291 / 0.000017464160919189453 === 377707 (exactly)
			// Also, 293*2**-14 === 0.01788330078125
			// => 6.596335828304291 / 0.01788330078125 === 368.8544921875 (exactly)

			let n1 = [6.596335828304291*(2**24)] // === 110668151
			let n2 = [293*(2**51)]; // 659777345409777700
			let n3 = [n1[0], n2[0]];

			let d = [0.01788330078125*(2**14)]; // === 293

			let res = eRem(n3,d);
			expect(res).to.eql([
				-0
			]);

			let n4 = n3.slice();
			n4[0] = n4[0] + 1;
			res = eRem(n4,d);
			expect(res).to.eql([
				1
			]);
		}
		{
			let res: number[];

			// a = (2**22 * 163*167*173*179*181*191*193) + (2*2*163*193) // <= prime numbers
			//   = (2**22 * 5624351580503521) + (125836)
			// b = 163*193 = 31459
			let a = [125836, 2**22 * 5624351580503521];
			let b = [31459];
			res = eRem(a,b);
			expect(res).to.eql([
				-0
			]);

			let c = a.slice();
			c[0] = c[0] + 11;
			res = eRem(c,b);
			expect(res).to.eql([
				11
			]);
		}
	});
});