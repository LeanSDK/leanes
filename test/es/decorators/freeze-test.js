const { expect, assert } = require('chai');
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const {
  initialize, freeze, nameBy, meta
} = LeanES.NS;

describe('freeze', () => {
  describe('freeze(acTarget)', () => {
    it('Target for `freeze` decorator must be a Class', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
          @freeze test;
        }
      }).to.throw(Error);
    });
    it('should decorator `freeze` without error', () => {
      expect(() => {

        @initialize
        @freeze
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }
        const cplExtensibles = Symbol.for('~isExtensible');
        const cpsExtensibleSymbol = Symbol.for('~extensibleSymbol');
        assert.isFalse(Test[cplExtensibles][Test[cpsExtensibleSymbol]]);
      }).to.not.throw(Error);
    });
  });
});
