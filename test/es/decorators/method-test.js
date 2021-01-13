const { expect, assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  CoreObject,
  initialize, partOf, method, nameBy, meta
} = LeanES.NS;

describe('method', () => {
  describe('method(target, key, descriptor)', () => {
    it('should add method in metaObject', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class SubTest extends CoreObject {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
        @method testMethod() {};
        @method static testStaticMethod() {};
      }
      assert.equal(SubTest.metaObject.parent.data.instanceMethods.testMethod, SubTest.new().testMethod);
      assert.equal(SubTest.metaObject.parent.data.classMethods.testStaticMethod, SubTest.testStaticMethod);
    });
  });
});
