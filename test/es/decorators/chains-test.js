const { expect, assert } = require('chai');
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const {
  initialize, chains, nameBy, meta
} = LeanES.NS;

describe('chains', () => {
  describe('chains(first: (string | string[] | Function), last: ?Function)', () => {
    it('Target for `chains` decorator must be a Class', () => {
      expect(() => {

        @initialize
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
          @chains(() => { }) test;
        }
      }).to.throw(Error);
    });
    it('Last argument in `chains` decorator must be a function', () => {
      expect(() => {

        @initialize
        @chains()
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }
      }).to.throw(Error);
    });
    it('should decorator `freeze` without error', () => {
      expect(() => {

        @initialize
        @chains(['create', 'update'], () => { return; })
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }
        assert.isOk(Test.metaObject.data.applyedMixins.ChainsMixin);
        expect(Test.metaObject.data.chains).to.eql({ create: '', update: '' });
      }).to.not.throw(Error);
    });
  });
});
