const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Proxy,
  initialize, partOf, nameBy, meta, method, property
} = LeanES.NS;

describe('Proxy', () => {
  describe('.new', () => {
    it('should create new proxy', () => {
      expect(() => {
        // const proxy = Proxy.new('TEST_PROXY', {});
        const proxy = Proxy.new();
        proxy.setName('TEST_PROXY');
        proxy.setData({});
      }).to.not.throw(Error);
    });
  });
  describe('.getProxyName', () => {
    it('should get proxy name', () => {
      // const proxy = Proxy.new('TEST_PROXY', {});
      const proxy = Proxy.new();
      proxy.setName('TEST_PROXY');
      proxy.setData({});
      expect(proxy.getProxyName()).to.equal('TEST_PROXY');
    });
  });
  describe('.getData', () => {
    it('should get proxy data', () => {
      const name = 'TEST_PROXY';
      const data = { data: 'getData' };
      // const proxy = Proxy.new(name, data);
      const proxy = Proxy.new();
      proxy.setName(name);
      proxy.setData(data);
      expect(proxy.getData()).to.equal(data);
    });
  });
  describe('.setData', () => {
    it('should set proxy data', () => {
      const name = 'TEST_PROXY';
      const data = { data: 'setData' };
      // const proxy = Proxy.new(name);
      const proxy = Proxy.new();
      proxy.setName(name);
      proxy.setData(data);
      expect(proxy.getData()).to.equal(data);
    });
  });
  describe('.onRegister', () => {
    it('should have onRegister function', () => {
      expect(() => {
        const name = 'TEST_PROXY';
        // const proxy = Proxy.new(name);
        const proxy = Proxy.new();
        proxy.setName(name);
        const onRegister = sinon.spy(proxy, 'onRegister');
        proxy.onRegister();
        assert(onRegister.called, 'Proxy.onRegister was not called');
      }).to.not.throw(Error);
    });
  });
  describe('.onRemove', () => {
    it('should have onRemove function', () => {
      expect(() => {
        const name = 'TEST_PROXY';
        // const proxy = Proxy.new(name);
        const proxy = Proxy.new();
        proxy.setName(name);
        const onRemove = sinon.spy(proxy, 'onRemove');
        proxy.onRemove();
        assert(onRemove.called, 'Proxy.onRemoved was not called');
      }).to.not.throw(Error);
    });
  });
});
