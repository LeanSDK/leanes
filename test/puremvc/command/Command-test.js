const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  NotificationInterface, Notification, Command,
  initialize, nameBy, meta, method
} = LeanES.NS;
import { injectable } from "inversify";

describe('Command', () => {
  describe('constructor', () => {
    it('should be created', () => {
      expect(() => {
        @initialize
        class TestCommand extends Command {
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
        class TestCommand extends Command {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};

          @method execute(voNotification: NotificationInterface) {
            trigger();
          }
        }

        const command = new TestCommand();
        const notification = Notification.new('TEST_NOTIFICATION', {body: 'body'}, 'TEST');
        command.execute(notification);
        assert(trigger.called);
      }).to.not.throw(Error);
    });
  });
  describe('initializeSubCommands', () => {
    it('should initialize macro command', () => {
      expect(() => {
        const initializeSubCommands = sinon.spy();

        @initialize
        class TestCommand extends Command {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};

          @method initializeSubCommands() {
            initializeSubCommands()
          }
        }

        const command = new TestCommand();
        assert(initializeSubCommands.called);
      }).to.not.throw(Error);
    });
  });
  describe('addSubCommand', () => {
    it('should add sub-command and execute macro', () => {
      expect(() => {
        const KEY = 'TEST_SUB_COMMANDS_001';
        const facade = LeanES.NS.Facade.getInstance(KEY);
        const command1Execute = sinon.spy();

        @initialize
        @injectable()
        class TestCommand1 extends Command {
          @nameBy static  __filename = 'TestCommand1';
          @meta static object = {};

          @method execute(voNotification: NotificationInterface) {
            command1Execute()
          }
        }

        const command2Execute = sinon.spy();

        @initialize
        @injectable()
        class TestCommand2 extends Command {
          @nameBy static  __filename = 'TestCommand2';
          @meta static object = {};

          @method execute(voNotification: NotificationInterface) {
            command2Execute()
          }
        }

        @initialize
        @injectable()
        class TestCommand extends Command {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};

          @method initializeSubCommands() {
            this.addSubCommand(TestCommand1);
            this.addSubCommand(TestCommand2);
          }
        }
        facade.container.bind(TestCommand.name).to(TestCommand);
        const command = facade.container.get(TestCommand.name);
        // const command = new TestCommand();
        command.initializeNotifier(KEY);
        //
        // // command.addSubCommand(TestCommand1);
        // // command.addSubCommand(TestCommand2);
        const notificaton = Notification.new('TEST_NOTIFICATION', {body: 'body'}, 'TEST')
        command.execute(notificaton);
        assert(command1Execute.called);
        assert(command2Execute.called);
        assert(command2Execute.calledAfter(command1Execute));
      }).to.not.throw(Error);
    });
  });
});
