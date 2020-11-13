const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../lib/index.dev" : "../../src/index.js";
const LeanES = require(path).default;
const { Pipes } = LeanES.NS;
const { Junction, Pipe, PipeMessage } = Pipes.NS;

describe('Junction', () => {
  describe('.new', () => {
    it('should create new Junction instance', () => {
      expect(() => {
        const junction = Junction.new();
      }).to.not.throw(Error);
    });
  });
  describe('.registerPipe', () => {
    it('should register pipe into junction', () => {
      expect(() => {
        const junction = Junction.new();
        const inputPipe = Pipe.new();
        const outputPipe = Pipe.new();
        const inputRegistered = junction.registerPipe('TEST_INPUT', Junction.INPUT, inputPipe);
        assert.isTrue(inputRegistered, 'TEST_INPUT not registered');
        assert.equal(junction._pipesMap['TEST_INPUT'], inputPipe, 'TEST_INPUT pipe not registered');
        assert.equal(junction._pipeTypesMap['TEST_INPUT'], Junction.INPUT, 'TEST_INPUT pipe type not registered');
        assert.include(junction._inputPipes, 'TEST_INPUT', 'Input pipes do not contain TEST_INPUT');
        const outputRegistered = junction.registerPipe('TEST_OUTPUT', Junction.OUTPUT, outputPipe);
        assert.isTrue(outputRegistered, 'TEST_OUTPUT not registered');
        assert.equal(junction._pipesMap['TEST_OUTPUT'], outputPipe, 'TEST_OUTPUT pipe not registered');
        assert.equal(junction._pipeTypesMap['TEST_OUTPUT'], Junction.OUTPUT, 'TEST_OUTPUT pipe type not registered');
        assert.include(junction._outputPipes, 'TEST_OUTPUT', 'Output pipes do not contain TEST_OUTPUT');
      }).to.not.throw(Error);
    });
  });
  describe('.removePipe', () => {
    it('should register pipe into junction and remove it after that', () => {
      expect(() => {
        const junction = Junction.new();
        const inputPipe = Pipe.new();
        const outputPipe = Pipe.new();
        const inputRegistered = junction.registerPipe('TEST_INPUT', Junction.INPUT, inputPipe);
        assert.isTrue(inputRegistered, 'TEST_INPUT not registered');
        assert.equal(junction._pipesMap['TEST_INPUT'], inputPipe, 'TEST_INPUT pipe not registered');
        assert.equal(junction._pipeTypesMap['TEST_INPUT'], Junction.INPUT, 'TEST_INPUT pipe type not registered');
        assert.include(junction._inputPipes, 'TEST_INPUT', 'Input pipes do not contain TEST_INPUT');
        const outputRegistered = junction.registerPipe('TEST_OUTPUT', Junction.OUTPUT, outputPipe);
        assert.isTrue(outputRegistered, 'TEST_OUTPUT not registered');
        assert.equal(junction._pipesMap['TEST_OUTPUT'], outputPipe, 'TEST_OUTPUT pipe not registered');
        assert.equal(junction._pipeTypesMap['TEST_OUTPUT'], Junction.OUTPUT, 'TEST_OUTPUT pipe type not registered');
        assert.include(junction._outputPipes, 'TEST_OUTPUT', 'Output pipes do not contain TEST_OUTPUT');
        junction.removePipe('TEST_INPUT', Junction.INPUT, inputPipe);
        assert.isUndefined(junction._pipesMap['TEST_INPUT'], inputPipe, 'TEST_INPUT pipe not registered');
        assert.isUndefined(junction._pipeTypesMap['TEST_INPUT'], Junction.INPUT, 'TEST_INPUT pipe type not registered');
        assert.notInclude(junction._inputPipes, 'TEST_INPUT', 'Input pipes do not contain TEST_INPUT');
        junction.removePipe('TEST_OUTPUT', Junction.OUTPUT, outputPipe);
        assert.isUndefined(junction._pipesMap['TEST_OUTPUT'], outputPipe, 'TEST_OUTPUT pipe not registered');
        assert.isUndefined(junction._pipeTypesMap['TEST_OUTPUT'], Junction.OUTPUT, 'TEST_OUTPUT pipe type not registered');
        assert.notInclude(junction._outputPipes, 'TEST_OUTPUT', 'Output pipes do not contain TEST_OUTPUT');
      }).to.not.throw(Error);
    });
  });
  describe('.retrievePipe', () => {
    it('should register pipe and get it', () => {
      expect(() => {
        const junction = Junction.new();
        const inputPipe = Pipe.new();
        junction.registerPipe('TEST_INPUT', Junction.INPUT, inputPipe);
        assert.equal(junction.retrievePipe('TEST_INPUT'), inputPipe, 'TEST_INPUT pipe not registered');
      }).to.not.throw(Error);
    });
  });
  describe('.hasPipe', () => {
    it('should register pipe and test its presence', () => {
      expect(() => {
        const junction = Junction.new();
        const inputPipe = Pipe.new();
        junction.registerPipe('TEST_INPUT', Junction.INPUT, inputPipe);
        assert.isTrue(junction.hasPipe('TEST_INPUT'), 'TEST_INPUT pipe not registered');
      }).to.not.throw(Error);
    });
  });
  describe('.hasInputPipe', () => {
    it('should register input pipe and test its presence', () => {
      expect(() => {
        const junction = Junction.new();
        const inputPipe = Pipe.new();
        junction.registerPipe('TEST_INPUT', Junction.INPUT, inputPipe);
        assert.isTrue(junction.hasInputPipe('TEST_INPUT'), 'TEST_INPUT pipe not registered');
      }).to.not.throw(Error);
    });
  });
  describe('.hasOutputPipe', () => {
    it('should register output pipe and test its presence', () => {
      expect(() => {
        const junction = Junction.new();
        const outputPipe = Pipe.new();
        junction.registerPipe('TEST_OUTPUT', Junction.OUTPUT, outputPipe);
        assert.isTrue(junction.hasOutputPipe('TEST_OUTPUT'), 'TEST_OUTPUT pipe not registered');
      }).to.not.throw(Error);
    });
  });
  describe('.addPipeListener', () => {
    it('should register input pipe and connect it to listener', () => {
      expect(() => {
        const context = {
          test: () => {}
        };
        const spyTest = sinon.spy(context, 'test');
        const junction = Junction.new();
        const inputPipe = Pipe.new();
        junction.registerPipe('TEST_INPUT', Junction.INPUT, inputPipe);
        junction.addPipeListener('TEST_INPUT', context, function (aoMessage) {
          this.test(aoMessage);
        });
        assert.isTrue(junction.hasInputPipe('TEST_INPUT'), 'TEST_INPUT pipe not registered');
        const message = PipeMessage.new(PipeMessage.NORMAL);
        inputPipe.write(message);
        assert.isTrue(spyTest.calledWith(message), 'Listener didn`t called on context');
      }).to.not.throw(Error);
    });
  });
  describe('.sendMessage', () => {
    it('should register output pipe and send message into this one', () => {
      expect(() => {
        const voOutput = Pipe.new();
        const spyWrite = sinon.spy(voOutput, 'write');
        const junction = Junction.new();
        const outputPipe = Pipe.new(voOutput);
        const message = PipeMessage.new(PipeMessage.NORMAL);
        junction.registerPipe('TEST_OUTPUT', Junction.OUTPUT, outputPipe);
        junction.sendMessage('TEST_OUTPUT', message)
        assert.isTrue(spyWrite.calledWith(message), 'Message received with context');
      }).to.not.throw(Error);
    });
  });
});
