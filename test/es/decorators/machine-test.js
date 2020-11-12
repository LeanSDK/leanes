const { expect, assert } = require('chai');
const sinon = require("sinon");
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const {
  initialize, partOf, machine, nameBy, meta
} = LeanES.NS;

describe('machine', () => {
  describe('machine(first: (string | Function), last: ?Function)', () => {
    it('should add method in metaObject', () => {
      const spySMConfig = sinon.spy(() => { });
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        @machine('42', spySMConfig)
        class MyClass extends LeanES.NS.CoreObject {
          @meta static object = {};
        }
        assert.isOk(MyClass.metaObject.parent.data.stateMachines['42']);
      }).to.not.throw(Error);
    });
  });
});
