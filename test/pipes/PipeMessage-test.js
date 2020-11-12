const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { PipeMessage } = LeanES.NS.Pipes.NS;

describe('PipeMessage', () => {
  describe('.new', () => {
    it('should create new PipeMessage instance', () => {
      expect(() => {
        const vnPriority = PipeMessage.PRIORITY_MED;
        const vsType = PipeMessage.NORMAL;
        const voHeader = {
          header: 'test'
        };
        const voBody = {
          message: 'TEST'
        };
        const message = PipeMessage.new(vsType, voHeader, voBody, vnPriority);
        assert.equal(message._type, vsType, 'Type is incorrect');
        assert.equal(message._priority, vnPriority, 'Priority is incorrect');
        assert.equal(message._header, voHeader, 'Header is incorrect');
        assert.equal(message._body, voBody, 'Body is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.getType, .setType', () => {
    it('should create new message and check type', () => {
      expect(() => {
        const vsType = PipeMessage.NORMAL;
        const vsTypeUpdated = 'TEST_TYPE';
        const message = PipeMessage.new(vsType);
        assert.equal(message._type, vsType, 'Type is incorrect');
        assert.equal(message._type, message.getType(), 'Type is incorrect');
        message.setType(vsTypeUpdated);
        assert.equal(message.getType(), vsTypeUpdated, 'Type is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.getHeader, .setHeader', () => {
    it('should create new message and set and get header', () => {
      expect(() => {
        const voHeader = {
          header: 'test'
        };
        const message = PipeMessage.new(PipeMessage.NORMAL);
        message.setHeader(voHeader);
        assert.equal(message._header, message.getHeader(), 'Header is incorrect');
        assert.equal(message.getHeader(), voHeader, 'Header is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.getBody, .setBody', () => {
    it('should create new message and set and get body', () => {
      expect(() => {
        const voBody = {
          body: 'test'
        };
        const message = PipeMessage.new(PipeMessage.NORMAL);
        message.setBody(voBody);
        assert.equal(message._body, message.getBody(), 'Body is incorrect');
        assert.equal(message.getBody(), voBody, 'Body is incorrect');
      }).to.not.throw(Error);
    });
  });
});
