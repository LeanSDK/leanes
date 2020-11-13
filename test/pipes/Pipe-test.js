const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const LeanES = require(path).default;
const { Pipe, PipeMessage } = LeanES.NS.Pipes.NS;

describe('Pipe', () => {
  describe('.new', () => {
    it('should create new Pipe instance', () => {
      expect(() => {
        const voOutput = Pipe.new();
        const pipe = Pipe.new(voOutput);
        assert.equal(pipe._output, voOutput, 'Output object is lost');
      }).to.not.throw(Error);
    });
  });
  describe('.connect', () => {
    it('should create pipe and connect it to output', () => {
      expect(() => {
        const voOutput = Pipe.new();
        const pipe = Pipe.new();
        pipe.connect(voOutput);
        assert.equal(pipe._output, voOutput, 'Output object is lost');
      }).to.not.throw(Error);
    });
  });
  describe('.disconnect', () => {
    it('should create pipe and disconnect it', () => {
      expect(() => {
        const voOutput = Pipe.new();
        const pipe = Pipe.new(voOutput);
        assert.equal(pipe._output, voOutput, 'Output object is lost');
        pipe.disconnect();
        assert.isNull(pipe._output, 'Output object is not cleared');
      }).to.not.throw(Error);
    });
  });
  describe('.write', () => {
    it('should create and write to output', () => {
      expect(() => {
        const voOutput = Pipe.new();
        const voMessage = PipeMessage.new(PipeMessage.NORMAL);
        const spyWrite = sinon.spy(voOutput, 'write');
        const pipe = Pipe.new(voOutput);
        assert.equal(pipe._output, voOutput, 'Output object is lost');
        pipe.write(voMessage);
        assert.isTrue(spyWrite.calledWith(voMessage), 'Message is not written');
      }).to.not.throw(Error);
    });
  });
});
