const { expect, assert } = require('chai');
const LeanES = require("../../../src/leanes/index.js").default;
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
        @chains(['create', 'update'])
        class Test extends LeanES {
          @nameBy static __filename = 'Test';
          @meta static object = {};
        }
      }).to.throw(Error);
    });
    it('should decorator `chains` without error', () => {
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
