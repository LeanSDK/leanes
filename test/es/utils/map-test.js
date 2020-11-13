const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const { map } = LeanES.NS.Utils;

describe('Utils.map', () => {
  describe('map(array, generator)', () => {
    it('should map list', async () => {
      const array = [Promise.resolve(1), Promise.resolve(5), Promise.resolve(3), Promise.resolve(7), Promise.resolve(2)];
      const context = {
        name: 'context'
      };
      const result = await map(array, async function (item, index) {
        return `item_${await item}_${this.name}`;
      }, context);
      assert.deepEqual(result, ['item_1_context', 'item_5_context', 'item_3_context', 'item_7_context', 'item_2_context']);
    });
  });
});
