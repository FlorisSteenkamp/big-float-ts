
import { expect, assert } from 'chai';
import { describe } from 'mocha';

import { eCompare } from '../../src/index.js';


describe('eCompare', function() {
	it('should correctly eCompare some floating point number expansions', 
	function() {
        // 0 === 0
        assert(eCompare([0], [0]) === 0); 

        assert(eCompare([1], [0]) > 0); 

        assert(eCompare([0], [10]) < 0); 

        assert(eCompare(
            [-2.7755575615628914e-17, 0.30000000000000004], 
            [10]) < 0
        ); 

        assert(eCompare(
            [-2.7755575615628914e-17, 0.30000000000000004], 
            [0.3]) > 0
        ); 
	});
});
