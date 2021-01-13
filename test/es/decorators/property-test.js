const { expect, assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  CoreObject,
  initialize, partOf, property, nameBy, meta
} = LeanES.NS;

describe('property', () => {
  describe('property(target, key, descriptor)', () => {
    it('should add variables in metaObject', () => {

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class SubTest extends CoreObject {
        @nameBy static  __filename = 'SubTest';
        @meta static object = {};
        @property test = 'test';
        @property static testStatic = 'testStatic';
      }
      assert.equal(SubTest.metaObject.parent.data.instanceVariables.test.initializer(), SubTest.new().test);
      assert.equal(SubTest.metaObject.parent.data.classVariables.testStatic.initializer(), SubTest.testStatic);
    });
  });
});
