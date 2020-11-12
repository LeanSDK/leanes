const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  Notification, Mediator,
  initialize, partOf, nameBy, meta, method, property
} = LeanES.NS;

describe('Mediator', () => {
  describe('.new', () => {
    it('should create new mediator', () => {
      expect(() => {
        const mediatorName = 'TEST_MEDIATOR';
        // const mediator = Mediator.new(mediatorName);
        const mediator = Mediator.new();
        mediator.setName(mediatorName);
      }).to.not.throw(Error);
    });
  });
  describe('.getMediatorName', () => {
    it('should get mediator name', () => {
      const mediatorName = 'TEST_MEDIATOR';
      // const mediator = Mediator.new(mediatorName);
      const mediator = Mediator.new();
      mediator.setName(mediatorName);
      expect(mediator.getMediatorName()).to.equal(mediatorName);
    });
  });
  describe('.getViewComponent', () => {
    it('should get mediator view component', () => {
      const mediatorName = 'TEST_MEDIATOR';
      const viewComponent = { id: 'view-component' };
      // const mediator = Mediator.new(mediatorName, viewComponent);
      const mediator = Mediator.new();
      mediator.setName(mediatorName);
      mediator.setViewComponent(viewComponent);
      expect(mediator.getViewComponent()).to.equal(viewComponent)
    });
  });
  describe('.listNotificationInterests', () => {
    it('should get mediator notification interests list', () => {
      @initialize
      class TestMediator extends Mediator {
        @nameBy static  __filename = 'TestMediator';
        @meta static object = {};
        @method listNotificationInterests () {
          return ['TEST1', 'TEST2', 'TEST3'];
        }
      }
      const mediatorName = 'TEST_MEDIATOR';
      // const mediator = TestMediator.new(mediatorName);
      const mediator = TestMediator.new();
      mediator.setName(mediatorName);
      expect(mediator.listNotificationInterests()).to.eql(['TEST1', 'TEST2', 'TEST3']);
    });
  });
  describe('.handleNotification', () => {
    it('should call handleNotification', () => {
      expect(() => {
        const mediatorName = 'TEST_MEDIATOR';
        // const mediator = Mediator.new(mediatorName);
        const mediator = Mediator.new();
        mediator.setName(mediatorName);
        const handleNotification = sinon.spy(mediator, 'handleNotification');
        const notification = Notification.new('TEST_NOTIFICATION', {body: 'body'}, 'TEST');
        mediator.handleNotification(notification);
        assert(handleNotification.called);
      }).to.not.throw(Error);
    });
  });
  describe('.onRegister', () => {
    it('should call onRegister', () => {
      expect(() => {
        const mediatorName = 'TEST_MEDIATOR';
        // const mediator = Mediator.new(mediatorName);
        const mediator = Mediator.new();
        mediator.setName(mediatorName);
        const onRegister = sinon.spy(mediator, 'onRegister');
        mediator.onRegister();
        assert(onRegister.called);
      }).to.not.throw(Error);
    });
  });
  describe('.onRemove', () => {
    it('should call onRemove', () => {
      expect(() => {
        const mediatorName = 'TEST_MEDIATOR';
        // const mediator = Mediator.new(mediatorName);
        const mediator = Mediator.new();
        mediator.setName(mediatorName);
        const onRemove = sinon.spy(mediator, 'onRemove');
        mediator.onRemove();
        assert(onRemove.called);
      }).to.not.throw(Error);
    });
  });
});
