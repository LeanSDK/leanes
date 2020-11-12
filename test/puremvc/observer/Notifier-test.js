const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const { Notifier, Facade } = LeanES.NS;

const NOTIFICATION_NAME = 'TEST_NOTIFICATION';
const NOTIFICATION_BODY = { body: 'body' };
const NOTIFICATION_TYPE = 'TEST';

describe('Notifier', () => {
  describe('.new', () => {
    before(() => {
      const facade = Facade.getInstance('NOTIFIER_TEST_1');
    });
    after(() => {
      const facade = Facade.getInstance('NOTIFIER_TEST_1');
      facade.remove();
    });
    it('should create new notifier', () => {
      expect(() => {
        const notifier = Notifier.new();
        notifier.initializeNotifier('NOTIFIER_TEST_1');
      }).to.not.throw(Error);
    });
  });
  describe('.sendNotification', () => {
    let spyCall = null;
    before(() => {
      const facade = Facade.getInstance('NOTIFIER_TEST_2');
      spyCall = sinon.spy(facade, 'sendNotification');
    });
    after(() => {
      const facade = Facade.getInstance('NOTIFIER_TEST_2');
      facade.remove();
    });
    it('should send notification', () => {
      expect(() => {
        const facade = Facade.getInstance('NOTIFIER_TEST_2');
        const notifier = Notifier.new();
        notifier.initializeNotifier('NOTIFIER_TEST_2');
        notifier.sendNotification(NOTIFICATION_NAME, NOTIFICATION_BODY, NOTIFICATION_TYPE);
        assert.isTrue(spyCall.calledWith(NOTIFICATION_NAME, NOTIFICATION_BODY, NOTIFICATION_TYPE), 'facade.sendNotification called incorrect');
      }).to.not.throw(Error);
    });
  });
});
