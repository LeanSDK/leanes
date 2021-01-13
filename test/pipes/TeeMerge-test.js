const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const LeanES = require(path).default;
const { Pipe, TeeMerge } = LeanES.NS.Pipes.NS;

describe('TeeMerge', () => {
  describe('.new', () => {
    it('should create new TeeMerge instance', () => {
      expect(() => {
        const merge = TeeMerge.new();
      }).to.not.throw(Error);
    });
  });
  describe('.connectInput', () => {
    it('should connect input', () => {
      expect(() => {
        const voInput1 = Pipe.new();
        const voInput2 = Pipe.new();
        const merge = TeeMerge.new(voInput1, voInput2);
        assert.equal(voInput1._output, merge, 'Input 1 not connected');
        assert.equal(voInput1._output, merge, 'Input 2 not connected');
      }).to.not.throw(Error);
    });
  });
});
