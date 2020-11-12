const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const MacroCommand = LeanES.NS.MacroCommand;
const {
  NotificationInterface, Notification, SimpleCommand,
  initialize, nameBy, meta, method
} = LeanES.NS;

describe('MacroCommand', () => {
  describe('constructor', () => {
    it('should be created', () => {
      expect(() => {
        @initialize
        class TestCommand extends MacroCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
        }

        const testCommand = new TestCommand()
      }).to.not.throw()
    });
  });
  describe('initializeMacroCommand', () => {
    it('should initialize macro command', () => {
      expect(() => {
        const initializeMacroCommand = sinon.spy();

        @initialize
        class TestCommand extends MacroCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};

          @method initializeMacroCommand() {
            initializeMacroCommand()
          }
        }

        const command = new TestCommand();
        assert(initializeMacroCommand.called);
      }).to.not.throw(Error);
    });
  });
  describe('addSubCommand', () => {
    it('should add sub-command and execute macro', () => {
      expect(() => {
        const KEY = 'TEST_MACRO_COMMAND_001';
        const facade = LeanES.NS.Facade.getInstance(KEY);
        const command = new MacroCommand();
        command.initializeNotifier(KEY);
        const command1Execute = sinon.spy(() => {});

        @initialize
        class TestCommand1 extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};

          @method execute(voNotification: NotificationInterface) {
            command1Execute()
          }
        }

        const command2Execute = sinon.spy(() => {});

        @initialize
        class TestCommand2 extends SimpleCommand {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};

          @method execute(voNotification: NotificationInterface) {
            command2Execute()
          }
        }

        command.addSubCommand(TestCommand1);
        command.addSubCommand(TestCommand2);
        const notificaton = Notification.new('TEST_NOTIFICATION', {body: 'body'}, 'TEST')
        command.execute(notificaton);
        assert(command1Execute.called);
        assert(command2Execute.called);
        assert(command2Execute.calledAfter(command1Execute));
      }).to.not.throw(Error);
    });
  });
});
