const { expect, assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  initialize, nameBy, meta, decorator
} = LeanES.NS;

describe('decorator', () => {
  describe('decorator(target, key, descriptor)', () => {
    it('should add decorators in metaObject', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @decorator test = function () {
            return 42;
          };
        }
        assert.isOk(Test.metaObject.data.decorators.test);
        assert.equal(Test.metaObject.data.decorators.test.value(), 42);
        assert.isFalse(Test.metaObject.data.decorators.test.configurable);
        assert.isFalse(Test.metaObject.data.decorators.test.writable);
        assert.isTrue(Test.metaObject.data.decorators.test.enumerable);
      }).to.not.throw(Error);
    });
    it('Target for `decorator` decorator must be a Module.prototype(fail)', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        class SubTest {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @decorator test = function () {
            return 42;
          };
        }
      }).to.throw(Error);
    });
  });
});
