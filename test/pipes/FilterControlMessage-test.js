const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../lib/index.dev" : "../../src/leanes/index.js";
const LeanES = require(path).default;
const { Pipes } = LeanES.NS;
const { FilterControlMessage } = Pipes.NS;

describe('FilterControlMessage', () => {
  describe('.new', () =>{
    it('should create new FilterControlMessage instance', () => {
      expect(() => {
        const vsName = 'TEST';
        const vsType = FilterControlMessage.FILTER;
        const vmFilter = function () {};
        const voParams = { test: 'TEST' };
        const message = FilterControlMessage.new(vsType, vsName, vmFilter, voParams);
        assert.equal(message._type, vsType, 'Type is incorrect');
        assert.equal(message._name, vsName, 'Name is incorrect');
        assert.equal(message._filter, vmFilter, 'Filter is incorrect');
        assert.equal(message._params, voParams, 'Params is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.getName, .setName', () => {
    it('should create new message and check name', () => {
      expect(() => {
        const vsName = 'TEST';
        const vsNameUpdated = 'NEW_TEST';
        const message = FilterControlMessage.new(FilterControlMessage.FILTER, vsName);
        assert.equal(message._name, vsName, 'Name is incorrect');
        assert.equal(message._name, message.getName(), 'Name is incorrect');
        message.setName(vsNameUpdated);
        assert.equal(message.getName(), vsNameUpdated, 'Name is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.getFilter, .setFilter', () => {
    it('should create new message and check filter', () => {
      expect(() => {
        const vmFilter = function () {};
        const vmFilterUpdated = function () {};
        const message = FilterControlMessage.new(FilterControlMessage.FILTER, 'TEST', vmFilter);
        assert.equal(message._filter, vmFilter, 'Filter is incorrect');
        assert.equal(message._filter, message.getFilter(), 'Filter is incorrect');
        message.setFilter(vmFilterUpdated);
        assert.equal(message.getFilter(), vmFilterUpdated, 'Filter is incorrect');
      }).to.not.throw(Error);
    });
  });
  describe('.getParams, .setParams', () => {
    it('should create new message and check filter', () => {
      expect(() => {
        const voParams = { test: 'test1' };
        const voParamsUpdated = { test: 'test2' };
        const message = FilterControlMessage.new(FilterControlMessage.FILTER, 'TEST', () => {}, voParams);
        assert.equal(message._params, voParams, 'Params is incorrect');
        assert.equal(message._params, message.getParams(), 'Params is incorrect');
        message.setParams(voParamsUpdated);
        assert.equal(message.getParams(), voParamsUpdated, 'Params is incorrect');
      }).to.not.throw(Error);
    });
  });
});
