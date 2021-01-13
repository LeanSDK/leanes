const { expect, assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  initialize, nameBy, meta
} = LeanES.NS;

describe('nameBy', () => {
  describe('nameBy(target, key, descriptor)', () => {
    it('should add classname', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'TestName';
        @meta static object = {};
      }
      assert.equal(Test.name, 'TestName');
    });
    it('should add classname (fail with __filename = null', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = null;
          @meta static object = {};
        }
        assert.equal(Test.name, 'TestName');
      }).to.throw(Error);
    });
  });
});