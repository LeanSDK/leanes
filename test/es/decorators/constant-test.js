const { expect, assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  initialize, constant, nameBy, meta
} = LeanES.NS;

describe('constant', () => {
  describe('constant(target, key, descriptor)', () => {
    it('Target for `constant` decorator must be a Module.prototype', () => {
      expect(() => {

        @initialize
        class Test {
          @constant TEST = 'test';
        }
      }).to.throw(Error);
    });
    it('should decorator `constant` without error', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant TEST = 'test';
        }
        assert.isOk(Test.metaObject.data.constants.TEST);
        assert.equal(Test.metaObject.data.constants.TEST.value, 'test');
        assert.isFalse(Test.metaObject.data.constants.TEST.configurable, 'Configurable should be false');
        assert.isFalse(Test.metaObject.data.constants.TEST.writable, 'Writable should be false');
        assert.isTrue(Test.metaObject.data.constants.TEST.enumerable, 'Enumerable should be false');
      }).to.not.throw(Error);
    });
    it('should decorator `constant` with getter without error', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @constant get TEST() {
            return 'test';
          };
        }
        assert.isOk(Test.metaObject.data.constants.TEST);
        assert.equal(Test.metaObject.data.constants.TEST.get(), 'test');
        assert.isFalse(Test.metaObject.data.constants.TEST.configurable, 'Configurable should be false');
        assert.isTrue(Test.metaObject.data.constants.TEST.enumerable, 'Enumerable should be false');
      }).to.not.throw(Error);
    });
  });
});
