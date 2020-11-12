const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { LogMessage, PipeMessage } = LeanES.NS.Pipes.NS;

describe('LogMessage', () => {
  describe('.new', () => {
    it('should create new LogMessage instance', () => {
      const vnLevel = LogMessage.NONE;
      const vsSender = 'TEST_SENDER';
      const vsMessage = {
        msg: 'TEST_MESSAGE'
      };
      const message = LogMessage.new(vnLevel, vsSender, vsMessage);
      assert.instanceOf(message, LogMessage);
      assert.equal(message._header.logLevel, vnLevel);
      assert.deepEqual(message._header.sender, vsSender);
      assert.equal(message._body, vsMessage);
      assert.equal(message._type, PipeMessage.NORMAL);
      assert.equal(message._priority, PipeMessage.PRIORITY_MED);
      assert.deepEqual(LogMessage.LEVELS, ['NONE', 'FATAL', 'ERROR', 'WARN', 'INFO', 'DEBUG']);
      assert.equal(LogMessage.SEND_TO_LOG, 'namespaces/pipes/messages/LoggerModule/sendToLog');
      assert.equal(LogMessage.STDLOG, 'standardLog');
    });
  });
  describe('.logLevel', () => {
    it('should test logging level', () => {
      const vnLevel = -2;
      const vsSender = 'TEST_SENDER';
      const vsMessage = {
        msg: 'TEST_MESSAGE'
      };
      const message = LogMessage.new(vnLevel, vsSender, vsMessage);
      assert.equal(message._header.logLevel, vnLevel);
      message.logLevel = LogMessage.CHANGE;
      assert.equal(message.logLevel, LogMessage.CHANGE);
      assert.equal(message._header.logLevel, LogMessage.CHANGE);
      message.logLevel = LogMessage.NONE;
      assert.equal(message.logLevel, LogMessage.NONE);
      assert.equal(message._header.logLevel, LogMessage.NONE);
      message.logLevel = LogMessage.FATAL;
      assert.equal(message.logLevel, LogMessage.FATAL);
      assert.equal(message._header.logLevel, LogMessage.FATAL);
      message.logLevel = LogMessage.ERROR;
      assert.equal(message.logLevel, LogMessage.ERROR);
      assert.equal(message._header.logLevel, LogMessage.ERROR);
      message.logLevel = LogMessage.WARN;
      assert.equal(message.logLevel, LogMessage.WARN);
      assert.equal(message._header.logLevel, LogMessage.WARN);
      message.logLevel = LogMessage.INFO;
      assert.equal(message.logLevel, LogMessage.INFO);
      assert.equal(message._header.logLevel, LogMessage.INFO);
      message.logLevel = LogMessage.DEBUG;
      assert.equal(message.logLevel, LogMessage.DEBUG);
      assert.equal(message._header.logLevel, LogMessage.DEBUG);
    });
  });
  describe('.sender', () => {
    it('should test sender', () => {
      const vnLevel = LogMessage.NONE;
      let vsSender = 'TEST_SENDER';
      const vsMessage = {
        msg: 'TEST_MESSAGE'
      };
      const message = LogMessage.new(vnLevel, vsSender, vsMessage);
      assert.equal(message._header.sender, vsSender);
      assert.equal(message.sender, vsSender);
      vsSender = 'TEST_ANOTHER_SENDER';
      message.sender = vsSender;
      assert.equal(message._header.sender, vsSender);
      assert.equal(message.sender, vsSender);
    });
  });
  describe('.time', () => {
    it('should test time', () => {
      const vnLevel = LogMessage.NONE;
      const vsSender = 'TEST_SENDER';
      const vsMessage = {
        msg: 'TEST_MESSAGE'
      };
      const message = LogMessage.new(vnLevel, vsSender, vsMessage);
      const vsTime = new Date().toISOString();
      message.time = vsTime;
      assert.equal(message._header.time, vsTime);
      assert.equal(message.time, vsTime);
    });
  });
  describe('.message', () => {
    it('should test message', () => {
      const vnLevel = LogMessage.NONE;
      const vsSender = 'TEST_SENDER';
      const vsMessage = {
        msg: 'TEST_MESSAGE'
      };
      const message = LogMessage.new(vnLevel, vsSender, vsMessage);
      assert.equal(message._body, vsMessage);
      assert.equal(message.message, vsMessage);
    });
  });
});
