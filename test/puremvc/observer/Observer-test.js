const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const { Notification, Observer } = LeanES.NS;

describe('Observer', () => {
  describe('.new', () => {
    it('should create new observer', () => {
      expect(() => {
        const context = {};
        const notifyMethod = () => {};
        const observer = Observer.new(notifyMethod, context);
      }).to.not.throw(Error);
    });
  });
  describe('.getNotifyMethod', () => {
    it('should get observer notify method', () => {
      const context = {};
      const notifyMethod = () => {};
      const observer = Observer.new(notifyMethod, context);
      expect(observer.getNotifyMethod()).to.equal(notifyMethod);
    });
  });
  describe('.setNotifyMethod', () => {
    it('should set observer notify method', () => {
      const notifyMethod = () => {};
      const observer = Observer.new();
      observer.setNotifyMethod(notifyMethod);
      expect(observer.getNotifyMethod()).to.equal(notifyMethod);
    });
  });
  describe('.getNotifyContext', () => {
    it('should get observer notify context', () => {
      const context = {};
      const notifyMethod = () => {};
      const observer = Observer.new(notifyMethod, context);
      expect(observer.getNotifyContext()).to.equal(context);
    });
  });
  describe('.setNotifyContext', () => {
    it('should set observer notify context', () => {
      const context = {};
      const observer = Observer.new();
      observer.setNotifyContext(context);
      expect(observer.getNotifyContext()).to.equal(context);
    });
  });
  describe('.notifyObserver', () => {
    it('should send notification', () => {
      expect(() => {
        const notifyMethod = function(notification) {
          this.notify(notification);
        };
        const context = {
          notify: () => {}
        };
        const notifyMethodSpy = sinon.spy(context, 'notify');
        const observer = Observer.new(notifyMethod, context);
        const notification = Notification.new('TEST_NOTIFY_OBSERVER');
        observer.notifyObserver(notification);
        assert(notifyMethodSpy.calledWith(notification));
      }).to.not.throw(Error);
    });
  });
});
