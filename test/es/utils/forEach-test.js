const chai = require("chai");
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const { forEach } = LeanES.NS.Utils;

describe('Utils.forEach', () => {
   describe('forEach(array, generator)', () => {
     it('should iterate over list', async () => {
      const array = [Promise.resolve(1), Promise.resolve(5), Promise.resolve(3), Promise.resolve(7), Promise.resolve(2)];
      const result = [];
      await forEach(array, async function (item, index) {
        this.push({
          [`key_${index}`]: await item
        });
      }, result);
      assert.deepEqual(result, [
        {
          key_0: 1
        },
        {
          key_1: 5
        },
        {
          key_2: 3
        },
        {
          key_3: 7
        },
        {
          key_4: 2
        }
      ]);
    });
  });
});
