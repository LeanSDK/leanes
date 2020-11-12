const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { LogFilterMessage, LogMessage } = LeanES.NS.Pipes.NS;

describe('LogFilterMessage', () => {
  describe('.new', () => {
    it('should create new LogFilterMessage instance', () => {
      const vsAction = 'TEST_ACTION';
      const vnLogLevel = 0;
      const message = LogFilterMessage.new(vsAction, vnLogLevel);
      assert.instanceOf(message, LogFilterMessage);
      assert.equal(message._type, vsAction);
      assert.equal(message._params.logLevel, vnLogLevel);
      assert.equal(LogFilterMessage.BASE, 'namespaces/pipes/messages/filter-control/LoggerModule/');
      assert.equal(LogFilterMessage.LOG_FILTER_NAME, 'namespaces/pipes/messages/filter-control/LoggerModule/logFilter/');
      assert.equal(LogFilterMessage.SET_LOG_LEVEL, 'namespaces/pipes/messages/filter-control/LoggerModule/setLogLevel/');
    });
  });
  describe('.logLevel', () => {
    it('should test logging level', () => {
      const vsAction = 'TEST_ACTION';
      let vnLogLevel = 0;
      let message = LogFilterMessage.new(vsAction, vnLogLevel);
      assert.equal(message.logLevel, vnLogLevel);
      vnLogLevel = 1;
      message = LogFilterMessage.new(vsAction, vnLogLevel);
      assert.equal(message.logLevel, vnLogLevel);
      vnLogLevel = 42;
      message = LogFilterMessage.new(vsAction, vnLogLevel);
      assert.equal(message.logLevel, vnLogLevel);
      vnLogLevel = 999;
      message = LogFilterMessage.new(vsAction, vnLogLevel);
      assert.equal(message.logLevel, vnLogLevel);
    });
  });
  describe('.filterLogByLevel', () => {
    it('should filter log by level', () => {
      const vnLevel = LogMessage.ERROR;
      const vsSender = 'TEST_SENDER';
      const vsMessage = {
        msg: 'TEST_MESSAGE'
      };
      assert.throws(() => {
        var message;
        message = LogMessage.new(vnLevel, vsSender, vsMessage);
        LogFilterMessage.filterLogByLevel(message, {
          logLevel: LogMessage.FATAL
        });
      });
      assert.doesNotThrow(() => {
        var message;
        message = LogMessage.new(vnLevel, vsSender, vsMessage);
        LogFilterMessage.filterLogByLevel(message, {
          logLevel: LogMessage.WARN
        });
      });
    });
  });
});
