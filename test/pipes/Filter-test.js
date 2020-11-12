const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { Pipes } = LeanES.NS;
const {
  Filter, Pipe, FilterControlMessage, PipeMessage
} = Pipes.NS;

describe('Filter', () => {
  describe('.new', () => {
    it('should create new Filter instance', () => {
      expect(() => {
        const filter = Filter.new('TEST');
        assert.equal(filter._name, 'TEST', 'Filter name is incorrect');
        assert.equal(filter._mode, FilterControlMessage.FILTER, 'Filter mode is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.setFilter', () => {
    it('should create filter and set filter function', () => {
      expect(() => {
        const testFilter = function () {};
        const filter = Filter.new('TEST');
        assert.equal(filter._name, 'TEST', 'Filter name is incorrect');
        filter.setFilter(testFilter);
        assert.equal(filter._mode, FilterControlMessage.FILTER, 'Filter mode is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.setParams', () => {
    it('should create filter and set params', () => {
      expect(() => {
        const testParams = { test: 'test1' };
        const filter = Filter.new('TEST');
        assert.equal(filter._name, 'TEST', 'Filter name is incorrect');
        filter.setParams(testParams);
        assert.equal(filter._params, testParams, 'Params is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.write', () => {
    describe('if message type is `LeanES.NS.PipeMessage.NORMAL`', () => {
      it('should get message and write it into output', () => {
        expect(() => {
          const output = Pipe.new();
          const filter = Filter.new('TEST', output, (aoMessage) => {
            return aoMessage;
          });
          const message = FilterControlMessage.new(PipeMessage.NORMAL, 'TEST');
          const stubWrite = sinon.stub(output, 'write').returns(true);
          filter.write(message);
          assert.isTrue(stubWrite.calledWith(message), 'write not called');
        }).to.not.throw(Error);
      });
    });
    describe('if message type is `LeanES.NS.FilterControlMessage.SET_PARAMS`', () => {
      it('should get message and update filter params', () => {
        expect(() => {
          const output = Pipe.new();
          const testParams = { test: 'test1' };
          const filter = Filter.new('TEST', output, (aoMessage) => {
            return aoMessage;
          });
          const message = FilterControlMessage.new(FilterControlMessage.SET_PARAMS, 'TEST');
          message.setParams(testParams);
          const stubWrite = sinon.stub(output, 'write').returns(true);
          filter.write(message);
          assert.isFalse(stubWrite.calledWith(message), 'write called');
          assert.equal(filter._params, testParams, 'params are incorrect');
        }).to.not.throw(Error);
      });
    });
    describe('if message type is `LeanES.NS.FilterControlMessage.SET_FILTER`', () => {
      it('should get message and update filter function', () => {
        expect(() => {
          const output = Pipe.new();
          const testFilter = function (aoMessage) {
            return aoMessage;
          };
          const spyFilter = sinon.spy(testFilter);
          const filter = Filter.new('TEST', output);
          const message = FilterControlMessage.new(FilterControlMessage.SET_FILTER, 'TEST');
          message.setFilter(testFilter);
          const stubWrite = sinon.stub(output, 'write').returns(true);
          filter.write(message);
          assert.isFalse(stubWrite.calledWith(message), 'write called');
          assert.equal(filter._filter, testFilter, 'filter function is incorrect');
        }).to.not.throw(Error);
      });
    });
    describe('if message type is `LeanES.NS.FilterControlMessage.BYPASS` or `LeanES.NS.FilterControlMessage.FILTER`', () => {
      it('should get message and update filter mode', () => {
        expect(() => {
          const output = Pipe.new();
          const filter = Filter.new('TEST', output);
          const message = FilterControlMessage.new(FilterControlMessage.BYPASS, 'TEST');
          const stubWrite = sinon.stub(output, 'write').returns(true);
          filter.write(message);
          assert.isFalse(stubWrite.calledWith(message), 'write called');
          assert.equal(filter._mode, FilterControlMessage.BYPASS, 'filter mode is incorrect');
          const output1 = Pipe.new();
          const filter1 = Filter.new('TEST1', output1);
          const message1 = FilterControlMessage.new(FilterControlMessage.FILTER, 'TEST1');
          const stubWrite1 = sinon.stub(output1, 'write').returns(true);
          assert.isFalse(stubWrite1.calledWith(message1), 'write called');
          assert.equal(filter1._mode, FilterControlMessage.FILTER, 'filter mode is incorrect');
        }).to.not.throw(Error);
      });
    });
  });
});
