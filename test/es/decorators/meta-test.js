const { expect, assert } = require('chai');
const sinon = require("sinon");
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  initialize, nameBy, meta, method
} = LeanES.NS;

describe('meta', () => {
  describe('meta(acTarget)', () => {
    it('Target for `meta` decorator must be a Class', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta object = {};
        }
      }).to.throw(Error);
    });
    it('should decorator `meta` without error', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }
        const cpoMetaObject = Symbol.for('~metaObject');
        assert.notEqual(LeanES[cpoMetaObject], Test[cpoMetaObject])
      }).to.not.throw(Error);
    });
  });
});
