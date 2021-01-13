const { expect, assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  initialize, nameBy, meta, partOf
} = LeanES.NS;

describe('initialize', () => {
  describe('initialize(acTarget)', () => {
    it('Target for `initialize` decorator must be a Class', () => {
      expect(() => {
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @initialize test;
        }
      }).to.throw(Error);
    });
    it('should decorator `initialize` without error', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class SubTest extends LeanES.NS.CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
        }
        assert.isOk(Test.prototype.SubTest);
        assert.equal(Test.prototype.SubTest, SubTest);
        assert.isOk(Test.metaObject.data.constants.SubTest)
      }).to.not.throw(Error);
    });
  });
});
