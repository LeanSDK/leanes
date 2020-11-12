const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { Pipe, TeeSplit, PipeMessage } = LeanES.NS.Pipes.NS;

describe('TeeSplit', () => {
  describe('.new', () => {
    it('should create new TeeSplit instance', () => {
      expect(() => {
        const voOutput1 = Pipe.new();
        const voOutput2 = Pipe.new();
        voOutput1.id = 1;
        voOutput2.id = 2;
        const split = TeeSplit.new(voOutput1, voOutput2);
        assert.include(split._outputs, voOutput1, 'Output 1 not connected');
        assert.include(split._outputs, voOutput2, 'Output 2 not connected');
      }).to.not.throw(Error);
    });
  });
  describe('.connect', () => {
    it('should add new output to splitter', () => {
      expect(() => {
        const voOutput1 = Pipe.new();
        const voOutput2 = Pipe.new();
        const voOutput3 = Pipe.new();
        voOutput1.id = 1;
        voOutput2.id = 2;
        voOutput3.id = 3;
        const split = TeeSplit.new(voOutput1, voOutput2);
        assert.include(split._outputs, voOutput1, 'Output 1 not connected');
        assert.include(split._outputs, voOutput2, 'Output 2 not connected');
        split.connect(voOutput3);
        assert.include(split._outputs, voOutput3, 'Output 3 not connected');
      }).to.not.throw(Error);
    });
  });
  describe('.disconnect', () => {
    it('should remove last output from splitter', () => {
      expect(() => {
        const voOutput1 = Pipe.new();
        const voOutput2 = Pipe.new();
        const voOutput3 = Pipe.new();
        voOutput1.id = 1;
        voOutput2.id = 2;
        voOutput3.id = 3;
        const split = TeeSplit.new(voOutput1, voOutput2);
        assert.include(split._outputs, voOutput1, 'Output 1 not connected');
        assert.include(split._outputs, voOutput2, 'Output 2 not connected');
        assert.isTrue(split._outputs.length === 2, 'Outputs.length not equal 2');
        split.connect(voOutput3);
        assert.isTrue(split._outputs.length === 3, 'Outputs.length not equal 3');
        assert.include(split._outputs, voOutput3, 'Output 3 not connected');
        split.disconnect();
        assert.isTrue(split._outputs.length === 2, 'Outputs.length not equal 2');
        assert.notInclude(split._outputs, voOutput3, 'Output 3 still connected');
      }).to.not.throw(Error);
    });
  });
  describe('.disconnectFitting', () => {
    it('should remove single output from splitter', () => {
      expect(() => {
        const voOutput1 = Pipe.new();
        const voOutput2 = Pipe.new();
        const voOutput3 = Pipe.new();
        voOutput1.id = 1;
        voOutput2.id = 2;
        voOutput3.id = 3;
        const split = TeeSplit.new(voOutput1, voOutput2);
        assert.include(split._outputs, voOutput1, 'Output 1 not connected');
        assert.include(split._outputs, voOutput2, 'Output 2 not connected');
        split.connect(voOutput3);
        assert.include(split._outputs, voOutput3, 'Output 3 not connected');
        split.disconnectFitting(voOutput2);
        assert.notInclude(split._outputs, voOutput2, 'Output 2 still connected');
      }).to.not.throw(Error);
    });
  });
  describe('.write', () => {
    it('should send message into all connected pipes', async () => {
      const voOutput1 = Pipe.new();
      const spyWrite1 = sinon.spy(voOutput1, 'write');
      const voOutput2 = Pipe.new();
      const spyWrite2 = sinon.spy(voOutput2, 'write');
      voOutput1.id = 1;
      voOutput2.id = 2;
      const split = TeeSplit.new(voOutput1, voOutput2);
      const message = PipeMessage.new(PipeMessage.NORMAL);
      await split.write(message);
      assert.isTrue(spyWrite1.called, 'Output 1 not receied message');
      assert.isTrue(spyWrite2.called, 'Output 2 not receied message');
    });
  });
});
