const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { Pipes, Facade } = LeanES.NS;
const { Pipe, JunctionMediator, PipeAwareModule } = Pipes.NS;

describe('PipeAwareModule', () => {
  describe('.new', () => {
    it('should create new PipeAwareModule instance', () => {
      expect(() => {
        const facade = Facade.getInstance('TEST_PIPE_AWARE_1');
        const pipeAwareModule = PipeAwareModule.new(facade);
        assert.equal(pipeAwareModule.facade, facade, 'Facade is incorrect');
        facade.remove();
      }).to.not.throw(Error);
    });
  });
  describe('.acceptInputPipe', () => {
    it('should send pipe as input pipe into notification', () => {
      expect(() => {
        const facade = Facade.getInstance('TEST_PIPE_AWARE_2');
        const pipeAwareModule = PipeAwareModule.new(facade);
        const pipe = Pipe.new();
        const spyFunction = sinon.spy(facade, 'sendNotification');
        pipeAwareModule.acceptInputPipe('PIPE_1', pipe);
        assert.isTrue(spyFunction.calledWith(JunctionMediator.ACCEPT_INPUT_PIPE, pipe, 'PIPE_1'), 'Notification not sent');
        facade.remove();
      }).to.not.throw(Error);
    });
  });
  describe('.acceptOutputPipe', () => {
    it('should send pipe as output pipe into notification', () => {
      expect(() => {
        const facade = Facade.getInstance('TEST_PIPE_AWARE_3');
        const pipeAwareModule = PipeAwareModule.new(facade);
        const pipe = Pipe.new();
        const spyFunction = sinon.spy(facade, 'sendNotification');
        pipeAwareModule.acceptOutputPipe('PIPE_2', pipe);
        assert.isTrue(spyFunction.calledWith(JunctionMediator.ACCEPT_OUTPUT_PIPE, pipe, 'PIPE_2'), 'Notification not sent');
        facade.remove();
      }).to.not.throw(Error);
    });
  });
});
