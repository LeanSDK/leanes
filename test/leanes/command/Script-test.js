const { expect, assert } = require('chai');
const sinon = require('sinon');
const EventEmitter = require('events');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  Script,
  initialize, partOf, nameBy, meta, constant, mixin, property, method,
} = LeanES.NS;

describe('Script', () => {
  describe('.new', () => {
    it('should create new command', () => {
      const command = Script.new();
      assert.instanceOf(command, Script, 'Cannot instantiate class LogMessageCommand');
    });
  });
  describe('body', () => {
    it('should run script body', async () => {
      const KEY = 'TEST_SCRIPT_001';

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      @initialize
      @partOf(Test)
      class TestScript extends LeanES.NS.Script {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
        @method async body(data: ?any): Promise<?any> { return data }
      }
      const command = TestScript.new();
      const data = await command.body({
        test: 'test'
      });
      assert.deepEqual(data, {
        test: 'test'
      });
    });
  });
  describe('execute', () => {
    let facade = null;
    after(() => {
      if(facade !== null) {
        facade.remove();
      }
    });
    it('should run script', async () => {
      const KEY = 'TEST_SCRIPT_002';

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }
      facade = Test.NS.Facade.getInstance(KEY);
      const trigger = new EventEmitter();

      @initialize
      @partOf(Test)
      class TestScript extends Script {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
        @method async body(data: ?any): Promise<?any> { return data }
        @method sendNotification(...args) {
          const result = super.sendNotification(...args);
          trigger.emit('RUN_SCRIPT', args);
          return result;
        }
      }
      const command = TestScript.new();
      command.initializeNotifier(KEY);
      const promise = new Promise ((resolve, reject) => {
        trigger.once('RUN_SCRIPT', (options) => {
          resolve(options);
        });
      });
      command.execute(LeanES.NS.Notification.new('TEST', {
        body: 'body'
      }, 'TEST_TYPE'));
      const options = await promise;
      assert.deepEqual(options, [
        LeanES.NS.SCRIPT_RESULT,
        {
          result: {
            body: 'body'
          }
        },
        'TEST_TYPE'
      ]);
      facade.remove();
    });
    it('should fail script', async () => {
      const KEY = 'TEST_SCRIPT_003';

      @initialize
      class Test extends LeanES {
        @nameBy static __filename = 'Test';
        @meta static object = {};
        @constant ROOT = `${__dirname}/config/root2`;
      }

      facade = Test.NS.Facade.getInstance(KEY);
      const trigger = new EventEmitter();

      @initialize
      @partOf(Test)
      class TestScript extends Script {
        @nameBy static __filename = 'TestScript';
        @meta static object = {};
        @method async body(data: ?any): Promise<?any> {
          throw new Error('TEST_ERROR')
        }
        @method sendNotification(...args) {
          const result = super.sendNotification(...args);
          trigger.emit('RUN_SCRIPT', args);
          return result;
        }
      }
      const command = TestScript.new();
      command.initializeNotifier(KEY);
      const promise = new Promise ((resolve, reject) => {
        trigger.once('RUN_SCRIPT', (options) => {
          resolve(options);
        });
      });
      command.execute(LeanES.NS.Notification.new('TEST', {
        body: 'body'
      }, 'TEST_TYPE'));
      const [title, body, type] = await promise;
      assert.equal(title, LeanES.NS.SCRIPT_RESULT);
      assert.instanceOf(body.error, Error);
      assert.equal(body.error.message, 'ERROR in Script::execute TEST_ERROR');
      assert.equal(type, 'TEST_TYPE');
      facade.remove();
    });
  });
});
