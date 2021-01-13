const { expect, assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  CoreObject,
  initialize, partOf, nameBy, meta, resolver
} = LeanES.NS;

describe('method', () => {
  describe('method(target, key, descriptor)', () => {
    it('should add method in metaObject', () => {

      @initialize
      @resolver(require, name => require(name))
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class SubTest extends CoreObject {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }
      assert.isOk(Test.metaObject.data.classMethods.resolve);
      assert.isOk(Test.metaObject.data.classMethods.require);
    });
    it('Target for `resolver` decorator must be a Module subclass', () => {
      expect(() =>{

        @initialize
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @resolver(require, name => require(name))
        class SubTest extends CoreObject {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }
      }).to.throw(Error);
    });
  });
});
