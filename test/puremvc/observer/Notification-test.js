const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const { Notification } = LeanES.NS;

const NOTIFICATION_NAME = 'TEST_NOTIFICATION';
const NOTIFICATION_BODY = { body: 'body' };
const NOTIFICATION_TYPE = 'TEST';

describe('Notification', () => {
  describe('.new', () => {
    it('should create new notification', () => {
      expect(() => {
        const notificaton = Notification.new(NOTIFICATION_NAME, NOTIFICATION_BODY, NOTIFICATION_TYPE);
      }).to.not.throw(Error);
    });
  });
  describe('.getName', () => {
    it('should get notification name', () => {
      const notificaton = Notification.new(NOTIFICATION_NAME, NOTIFICATION_BODY, NOTIFICATION_TYPE);
      expect(notificaton.getName()).to.equal(NOTIFICATION_NAME);
    });
  });
  describe('.getBody', () => {
    it('should get notification body', () => {
      const notificaton = Notification.new(NOTIFICATION_NAME, NOTIFICATION_BODY, NOTIFICATION_TYPE);
      expect(notificaton.getBody()).to.equal(NOTIFICATION_BODY);
    });
  });
  describe('.setBody', () => {
    it('should set notification body', () => {
      const notificaton = Notification.new(NOTIFICATION_NAME);
      notificaton.setBody(NOTIFICATION_BODY);
      expect(notificaton.getBody()).to.equal(NOTIFICATION_BODY);
    });
  });
  describe('.getType', () => {
    it('should get notification type', () => {
      const notificaton = Notification.new(NOTIFICATION_NAME, NOTIFICATION_BODY, NOTIFICATION_TYPE);
      expect(notificaton.getType()).to.equal(NOTIFICATION_TYPE);
    });
  });
  describe('.setType', () => {
    it('should set notification type', () => {
      const notificaton = Notification.new(NOTIFICATION_NAME);
      notificaton.setType(NOTIFICATION_TYPE);
      expect(notificaton.getType()).to.equal(NOTIFICATION_TYPE);
    });
  });
  describe('.replicateObject', () => {
    it('should create replica for notification', async () => {
      const notificaton = Notification.new('XXX', 'YYY', 'ZZZ');
      const replica = await Notification.replicateObject(notificaton);
      assert.deepEqual(replica, {
        type: 'instance',
        class: 'Notification',
        notification: {
          name: 'XXX',
          body: 'YYY',
          type: 'ZZZ'
        }
      });
    });
  });
  describe('.restoreObject', () => {
    it('should restore notification from replica', async () => {
      const notification = await Notification.restoreObject(LeanES, {
        type: 'instance',
        class: 'Notification',
        notification: {
          name: 'XXX',
          body: 'YYY',
          type: 'ZZZ'
        }
      });
      assert.equal(notification.getName(), 'XXX');
      assert.equal(notification.getBody(), 'YYY');
      assert.equal(notification.getType(), 'ZZZ');
    });
  });
});
