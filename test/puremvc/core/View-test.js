const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  APPLICATION_MEDIATOR,
  NotificationInterface,
  View, Controller, Notification, Observer, Mediator,
  initialize, partOf, nameBy, meta, method, property
} = LeanES.NS;
import { Container } from 'inversify';

describe('View', () => {
  describe('.getInstance', () => {
    it('should get new or exiciting instance of View', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST1', new Container());
        if(!(view instanceof View)) {
          throw new Error('The `view` is not an instance of View');
        }
      }).to.not.throw(Error);
    });
  });
  describe('.removeView', () => {
    it('should get new instance of View, remove it and get new one', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST2', new Container());
        View.removeView('VIEW__TEST2');
        const newView = View.getInstance('VIEW__TEST2', new Container());
        if(view === newView) {
          throw new Error('View instance didn`t renewed')
        }
      }).to.not.throw(Error);
    });
  });
  describe('.registerObserver', () => {
    it('should register new observer', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST3', new Container());
        const controller = Controller.getInstance('VIEW__TEST3', view._container);
        const notifyMethod = sinon.spy();
        notifyMethod.resetHistory();
        const observer = Observer.new(notifyMethod, controller);
        const notification = Notification.new('TEST_VIEW');
        view.registerObserver(notification.getName(), observer);
        view.notifyObservers(notification);
        assert(notifyMethod.called, 'Observer is not registered')
      }).to.not.throw(Error);
    });
  });
  describe('.removeObserver', () => {
    it('should remove observer', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST4', new Container());
        const controller = Controller.getInstance('VIEW__TEST4', view._container);
        const notifyMethod = sinon.spy();
        notifyMethod.resetHistory();
        const observer = Observer.new(notifyMethod, controller);
        const notification = Notification.new('TEST_VIEW');
        view.registerObserver(notification.getName(), observer);
        view.removeObserver(notification.getName(), observer.getNotifyContext());
        view.notifyObservers(notification);
        assert(!notifyMethod.called, 'Observer is not registered')
      }).to.not.throw(Error);
    });
  });
  describe('.registerMediator', () => {
    it('should register new mediator', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST5', new Container());
        const onRegister = sinon.spy();
        const handleNotification = sinon.spy();
        const viewComponent = {};
        @initialize
        class TestMediator extends Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
          @method listNotificationInterests() {
            return ['TEST_LIST'];
          }
          @method handleNotification() {
            handleNotification();
          }
          @method onRegister() {
            onRegister();
          }
        }
        // const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        const mediator = TestMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(viewComponent);
        view.registerMediator(mediator);
        assert(onRegister.called, 'Mediator is not registered');
        onRegister.resetHistory();
        view.notifyObservers(Notification.new('TEST_LIST'));
        assert(handleNotification.called, 'Mediator cannot subscribe interests');
      }).to.not.throw(Error)
    });
  });
  describe('.retrieveMediator', () => {
    it('should retrieve registered mediator', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST6', new Container());
        const viewComponent = {};
        @initialize
        class TestMediator extends Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
        }
        // const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        const mediator = TestMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(viewComponent);
        view.registerMediator(mediator);
        const retrievedMediator = view.retrieveMediator('TEST_MEDIATOR');
        assert.deepEqual(retrievedMediator, mediator, 'Mediator cannot be retrieved');
        const retrievedAbsentMediator = view.retrieveMediator('TEST_MEDIATOR_ABSENT');
        assert(!retrievedAbsentMediator, 'Retrieve absent mediator');
      }).to.not.throw(Error);
    });
  });
  describe('.removeMediator', () => {
    it('should remove mediator', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST7', new Container());
        const onRegister = sinon.spy();
        const onRemove = sinon.spy(() => {});
        const viewComponent = {};
        @initialize
        class TestMediator extends Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
          @method onRegister() {
            onRegister();
          }
          @method onRemove() {
            onRemove();
          }
        }
        // const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        const mediator = TestMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(viewComponent);
        view.registerMediator(mediator);
        assert(onRegister.called, 'Mediator is not registered');
        onRegister.resetHistory();
        view.removeMediator('TEST_MEDIATOR');
        assert(onRemove.called, 'Mediator onRemove hook not called');
        const hasMediator = view.hasMediator('TEST_MEDIATOR');
        assert(!hasMediator, 'Mediator didn`t removed');
      }).to.not.throw(Error)
    });
  });
  describe('.hasMediator', () => {
    it('should has mediator', () => {
      expect(() => {
        const view = View.getInstance('VIEW__TEST8', new Container());
        @initialize
        class TestMediator extends Mediator {
          @nameBy static  __filename = 'TestMediator';
          @meta static object = {};
        }
        const viewComponent = {};
        // const mediator = TestMediator.new('TEST_MEDIATOR', viewComponent);
        const mediator = TestMediator.new();
        mediator.setName('TEST_MEDIATOR');
        mediator.setViewComponent(viewComponent);
        view.registerMediator(mediator);
        const hasMediator = view.hasMediator('TEST_MEDIATOR');
        assert(hasMediator, 'Mediator is absent');
        const hasNoAbsentMediator = !(view.hasMediator('TEST_MEDIATOR_ABSENT'));
        assert(hasNoAbsentMediator, 'Absent mediator is accessible');
      }).to.not.throw(Error)
    });
  });
});
