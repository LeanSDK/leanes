const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const { jsonStringify } = LeanES.NS.Utils;

describe('Utils.jsonStringify', () => {
   describe('jsonStringify(object, options)', () => {
    it('should stringify flat object', () => {
      expect(() => {
        const object = {};
        object.x = 'test';
        object.a = 42;
        object.test = false;
        const result = jsonStringify(object);
        assert.equal(result, '{"a":42,"test":false,"x":"test"}');
      }).to.not.throw(Error);
    });
     it('should stringify nested object', () => {
      expect(() => {
        const object = {};
        object.x = 'test';
        object.a = 42;
        object.test = false;
        object.nested = {};
        object.nested.c = 1;
        object.nested.b = 2;
        object.nested.a = 3;
        const result = jsonStringify(object);
        assert.equal(result, '{"a":42,"nested":{"a":3,"b":2,"c":1},"test":false,"x":"test"}');
      }).to.not.throw(Error);
    });
  });
});
