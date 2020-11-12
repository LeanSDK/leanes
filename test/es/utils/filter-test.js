const chai = require("chai");
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const { filter } = LeanES.NS.Utils;

describe('Utils.filter', () => {
  describe('filter(array, generator)', () => {
    it('should filter list by async condition', async () => {
      const array = [Promise.resolve(1), Promise.resolve(5), Promise.resolve(3), Promise.resolve(7), Promise.resolve(2)];
      const context = {
        condition: async function (value) {
          const ref = await value;
          return (3 < ref && ref < 7);
        }
      };
      const result = await filter(array, async function (item, index) {
        return await this.condition(item);
      }, context);
      assert.lengthOf(result, 1);
      assert.equal((await result[0]), 5);
    });
    it('should filter list by sync condition', async () => {
      const array = [Promise.resolve(1), Promise.resolve(5), Promise.resolve(3), Promise.resolve(7), Promise.resolve(2)];
      const context = {
        condition: function (value) {
          return (3 < value && value < 7);
        }
      };
      const result = await filter(array, async function (item, index) {
        return await this.condition(await item);
      }, context);
      assert.lengthOf(result, 1);
      assert.equal((await result[0]), 5);
    });
  });
});
