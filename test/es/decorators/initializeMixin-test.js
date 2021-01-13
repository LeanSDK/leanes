const { expect, assert } = require('chai');
const sinon = require("sinon");
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  initialize, initializeMixin, nameBy, meta, method
} = LeanES.NS;

describe('initializeMixin', () => {
  describe('initializeMixin(acTarget)', () => {
    it('Target for `initializeMixin` decorator must be a Class', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @initializeMixin test;
        }
      }).to.throw(Error);
    });
    it('should decorator `freeze` without error', () => {
      expect(() => {
        let test = null;
        const TestMixin = ((BaseClass) => {
          @initializeMixin
          class Mixin extends BaseClass {
            @meta static object = {};

            @method static onInitialize(...args) {
              super.onInitialize(...args);
            }

            @method static onInitializeMixin(...args) {
              super.onInitializeMixin(...args);
              test = 42;
            }
          }
          return Mixin;
        });
        TestMixin(LeanES.NS.CoreObject);
        assert.equal(test, 42);
      }).to.not.throw(Error);
    });
  });
});
