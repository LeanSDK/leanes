const { expect, assert } = require('chai');
const sinon = require("sinon");
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  CoreObject,
  initialize, partOf, nameBy, meta
} = LeanES.NS;

describe('mixin', () => {
  describe('mixin(acModule)', () => {
    it('should add target', () => {
      const spySMConfig = sinon.spy(() => { });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class SubTest extends CoreObject {
        @nameBy static __filename = 'SubTest';
        @meta static object = {};
      }
      assert.equal(SubTest.metaObject.target.Module, Test);
    });
    it('Target for `partOf` decorator must be a Class(fail)', () => {
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        class SubTest extends CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
          @partOf(Test) object = {}
        }
      }).to.throw(Error);
    });
  });
});
