const { expect, assert } = require('chai');
const sinon = require('sinon');
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const {
  LogMessageCommand,
  initialize, partOf, nameBy, meta, constant, mixin, property, method, attribute, action
} = LeanES.NS;

describe('LogMessageCommand', () => {
  describe('.new', () => {
    it('should create new command', () => {
      const command = LogMessageCommand.new();
      assert.instanceOf(command, LogMessageCommand, 'Cannot instantiate class LogMessageCommand');
    });
  });
  describe('.execute', () => {
    it('should create new command', () => {
      const KEY = 'TEST_LOG_MESSAGE_COMMAND_001';
      const facade = LeanES.NS.Facade.getInstance(KEY);
      const spyAddLogEntry = sinon.spy(() => {});

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = __dirname;
      }

      @initialize
      @partOf(Test)
      class TestProxy extends LeanES.NS.Proxy {
        @nameBy static __filename = 'TestProxy';
        @meta static object = {};
        @method addLogEntry(body) {
          spyAddLogEntry(body);
        }
      }
      const proxy = TestProxy.new();
      proxy.setName(LeanES.NS.Application.LOGGER_PROXY);
      facade.registerProxy(proxy);
      const command = LogMessageCommand.new();
      command.initializeNotifier(KEY);
      const body = {
        data: 'data'
      };
      command.execute(LeanES.NS.Notification.new('TEST', body, 'TYPE'));
      assert.isTrue(spyAddLogEntry.called)
      assert.isTrue(spyAddLogEntry.calledWith(body));
      facade.remove();
    });
  });
});
