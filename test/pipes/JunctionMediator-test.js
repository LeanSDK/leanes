const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { Pipes, Notification } = LeanES.NS;
const { Junction, JunctionMediator, Pipe, PipeMessage } = Pipes.NS;

describe('JunctionMediator', () => {
  describe('.new', () => {
    it('should create new JunctionMediator instance', () => {
      expect(() => {
        JunctionMediator.new();
      }).to.not.throw(Error);
    });
  });
  describe('.listNotificationInterests', () => {
    it('should get acceptable notifications', () => {
      expect(() => {
        const mediator = JunctionMediator.new();
        assert.deepEqual(mediator.listNotificationInterests(), [
          JunctionMediator.ACCEPT_INPUT_PIPE,
          JunctionMediator.ACCEPT_OUTPUT_PIPE,
          JunctionMediator.REMOVE_PIPE
        ], 'Acceptable notifications list is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.handleNotification', () => {
    it('should handle `LeanES.NS.JunctionMediator.ACCEPT_INPUT_PIPE` notification', () => {
      expect(() => {
        const MULTITON_KEY = 'TEST_JUNCTION_1';
        const inputPipe = Pipe.new();
        const junction = Junction.new();
        const spyRegisterPipe = sinon.spy(junction, 'registerPipe');
        const spyAddPipeListener = sinon.spy(junction, 'addPipeListener');
        // const mediator = JunctionMediator.new('TEST_MEDIATOR', junction);
        const mediator = JunctionMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(junction);
        mediator.initializeNotifier(MULTITON_KEY);
        const spySendNotification = sinon.spy(mediator, 'sendNotification');
        const notification = Notification.new(JunctionMediator.ACCEPT_INPUT_PIPE, inputPipe, 'INPUT_PIPE');
        mediator.handleNotification(notification);
        assert.isTrue(spyRegisterPipe.calledWith('INPUT_PIPE', Junction.INPUT, inputPipe), 'Junction.NS.registerPipe did not called');
        assert.isTrue(spyAddPipeListener.calledWith('INPUT_PIPE', mediator, mediator.handlePipeMessage), 'Junction.NS.registerPipe did not called');
        const message = PipeMessage.new(PipeMessage.NORMAL);
        inputPipe.write(message);
        assert.isTrue(spySendNotification.calledWith(PipeMessage.NORMAL, message), 'JunctionMediator.NS.handlePipeMessage didn`t called');
      }).to.not.throw(Error);
    });
    it('should handle `LeanES.NS.JunctionMediator.ACCEPT_OUTPUT_PIPE` notification', () => {
      expect(() => {
        const MULTITON_KEY = 'TEST_JUNCTION_2';
        const finalNode = Pipe.new();
        const spyWrite = sinon.spy(finalNode, 'write');
        const outputPipe = Pipe.new(finalNode);
        const junction = Junction.new();
        const spyRegisterPipe = sinon.spy(junction, 'registerPipe');
        // const mediator = JunctionMediator.new('TEST_MEDIATOR', junction);
        const mediator = JunctionMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(junction);
        mediator.initializeNotifier(MULTITON_KEY);
        const notification = Notification.new(JunctionMediator.ACCEPT_OUTPUT_PIPE, outputPipe, 'OUTPUT_PIPE');
        mediator.handleNotification(notification);
        assert.isTrue(spyRegisterPipe.calledWith('OUTPUT_PIPE', Junction.OUTPUT, outputPipe), 'Junction.NS.registerPipe did not called');
        const message = PipeMessage.new(PipeMessage.NORMAL);
        junction.sendMessage('OUTPUT_PIPE', message);
        assert.isTrue(spyWrite.calledWith(message), 'Pipe.NS.write didn`t called');
      }).to.not.throw(Error);
    });
    it('should handle `LeanES.NS.JunctionMediator.REMOVE_PIPE` notification', () => {
      expect(() => {
        const MULTITON_KEY = 'TEST_JUNCTION_3';
        const outputPipe = Pipe.new();
        const junction = Junction.new();
        const spyRemovePipe = sinon.spy(junction, 'removePipe');
        // const mediator = JunctionMediator.new('TEST_MEDIATOR', junction);
        const mediator = JunctionMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(junction);
        mediator.initializeNotifier(MULTITON_KEY);
        const acceptNotification = Notification.new(JunctionMediator.ACCEPT_OUTPUT_PIPE, outputPipe, 'OUTPUT_PIPE');
        mediator.handleNotification(acceptNotification);
        assert.isTrue(junction.hasPipe('OUTPUT_PIPE'), 'Pipe not registered');
        const removeNotification = Notification.new(JunctionMediator.REMOVE_PIPE, outputPipe, 'OUTPUT_PIPE');
        mediator.handleNotification(removeNotification);
        assert.isTrue(spyRemovePipe.calledWith('OUTPUT_PIPE'), 'Junction.NS.removePipe did not called');
        assert.isFalse(junction.hasPipe('OUTPUT_PIPE'), 'Pipe not removed')
      }).to.not.throw(Error);
    });
  });
  describe('.handlePipeMessage', () => {
    it('should send notification in handle', () => {
      expect(() => {
        const MULTITON_KEY = 'TEST_JUNCTION_3';
        const junction = Junction.new();
        // const mediator = JunctionMediator.new('TEST_MEDIATOR', junction);
        const mediator = JunctionMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(junction);
        mediator.initializeNotifier(MULTITON_KEY);
        const message = PipeMessage.new(PipeMessage.NORMAL);
        const spySendNotification = sinon.spy(mediator, 'sendNotification');
        mediator.handlePipeMessage(message);
        assert.isTrue(spySendNotification.calledWith(PipeMessage.NORMAL, message), 'JunctionMediator.NS.handlePipeMessage didn`t called')
      }).to.not.throw(Error);
    });
  });
});
