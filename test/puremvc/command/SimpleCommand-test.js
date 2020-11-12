const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const SimpleCommand = LeanES.NS.SimpleCommand;
const { initialize, nameBy, meta, method } = LeanES.NS;

describe('SimpleCommand', () => {
  describe('constructor', () => {
    it('should be created', () => {
      expect(() => {
        @initialize
        class TestCommand extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
        }

        const testCommand = new TestCommand()
      }).to.not.throw()
    });
  });
  describe('execute', () => {
    it('should create new command', () => {
      expect(() => {
        const trigger = sinon.spy();
        trigger.resetHistory();

        @initialize
        class TestCommand extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};

          @method execute(voNotification: LeanES.NS.NotificationInterface) {
            trigger();
          }
        }

        const command = new TestCommand();
        const notification = LeanES.NS.Notification.new('TEST_NOTIFICATION', {body: 'body'}, 'TEST');
        command.execute(notification);
        assert(trigger.called);
      }).to.not.throw(Error);
    });
  });
});
