const { expect, assert } = require('chai');
const sinon = require("sinon");
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const {
  CoreObject,
  initialize, partOf, mixin, nameBy, meta, machine
} = LeanES.NS;

describe('mixin', () => {
  describe('mixin(...alMixins)', () => {
    it('should add variables in metaObject', () => {
      const spySMConfig = sinon.spy(() => { });

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.StateMachineMixin)
      @machine('default', spySMConfig)
      @partOf(Test)
      class SubTest extends CoreObject {
        @nameBy static __filename = 'SubTest';
        @meta static object = {};
      }
      assert.isOk(SubTest.metaObject.parent.data.applyedMixins.StateMachineMixin);
    });
    it('Target for `mixin` decorator must be a Class(fail)', () => {
      expect(() => {
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
          @mixin(LeanES.NS.StateMachineMixin) object = {}
        }
      }).to.throw(Error);
    });
    it('Mixin must be a function(fail)', () => {
      expect(() => {
        const spySMConfig = sinon.spy(() => { });

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @mixin('testMixin')
        @machine('default', spySMConfig)
        @partOf(Test)
        class SubTest extends CoreObject {
          @nameBy static __filename = 'SubTest';
          @meta static object = {};
        }
      }).to.throw(Error);
    });
  });
});
