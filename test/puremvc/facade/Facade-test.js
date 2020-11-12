const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const LeanES = require("../../../src/leanes/index.js").default;
const {
  APPLICATION_MEDIATOR,
  initialize, partOf, nameBy, meta, method, property, resolver
} = LeanES.NS;

describe('Facade', () => {
  describe('.getInstance', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should get new or exiciting instance of Facade', () => {
      const { Facade } = LeanES.NS;
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST1');
      assert.instanceOf(facade, Facade, 'The `facade` is not an instance of Facade');
      const facade1 = Facade.getInstance('FACADE__TEST1');
      assert.deepEqual(facade, facade1, 'Instances of facade not equal');
    });
  });
  describe('.initializeNotifier', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should initialize notifier', () => {
      const multitonKey = 'FACADE__TEST2';
      facade = LeanES.NS.Facade.getInstance(multitonKey);
      expect(facade._multitonKey).to.equal(multitonKey);
    });
  });
  describe('.registerCommand', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should register new command', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST3');

      @initialize
      class TestCommand extends LeanES.NS.Command {
        @nameBy static  __filename = 'TestCommand';
        @meta static object = {};
      }
      facade.registerCommand('TEST_COMMAND', TestCommand);
      assert(facade.hasCommand('TEST_COMMAND'));
    });
  });
  describe('lazyRegisterCommand', () => {
    let facade = null;
    const INSTANCE_NAME = 'TEST999';
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should register new command lazily', () => {
      const spy = sinon.spy();

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestCommand extends LeanES.NS.Command {
        @nameBy static  __filename = 'TestCommand';
        @meta static object = {};

        @method execute(voNotification: LeanES.NS.NotificationInterface) {
            spy();
        }
      }

      @initialize
      @partOf(Test)
      class Application extends Test.NS.CoreObject {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
      }

      facade = Test.NS.Facade.getInstance(INSTANCE_NAME);
      // facade.registerMediator(Test.NS.Mediator.new(APPLICATION_MEDIATOR, Application.new()));
      const mediator = Test.NS.Mediator.new();
      mediator.setName(APPLICATION_MEDIATOR);
      mediator.setViewComponent(Application.new());
      facade.registerMediator(mediator);
      const vsNotificationName = 'TEST_COMMAND2';
      facade.lazyRegisterCommand(vsNotificationName, 'TestCommand');
      assert(facade.hasCommand(vsNotificationName));
      facade.sendNotification(vsNotificationName);
      assert(spy.called);
    });
  });
  describe('.removeCommand', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should remove command if present', async () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST4');

      @initialize
      class TestCommand extends LeanES.NS.Command {
        @nameBy static  __filename = 'TestCommand';
        @meta static object = {};
      }
      facade.registerCommand('TEST_COMMAND', TestCommand);
      assert(facade.hasCommand('TEST_COMMAND'));
      await facade.removeCommand('TEST_COMMAND');
      assert(!facade.hasCommand('TEST_COMMAND'))
    });
  });
  describe('.hasCommand', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('has command', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST5');

      @initialize
      class TestCommand extends LeanES.NS.Command {
        @nameBy static  __filename = 'TestCommand';
        @meta static object = {};
      }

      facade.registerCommand('TEST_COMMAND', TestCommand);
      assert(facade.hasCommand('TEST_COMMAND'));
      assert(!facade.hasCommand('TEST_COMMAND_ABSENT'))
    });
  });
  describe('.registerProxy', () => {
    let facade = null;
    const INSTANCE_NAME = 'TEST6';
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should register new proxy and regiter it', () => {
      facade = LeanES.NS.Facade.getInstance(INSTANCE_NAME);
      const onRegister = sinon.spy(() => {});

      @initialize
      class TestProxy extends LeanES.NS.Proxy {
        @nameBy static  __filename = 'TestProxy';
        @meta static object = {};

        @method onRegister() {
          onRegister();
        }
      }
      const proxyData = {data: 'data'};
      // const testProxy = TestProxy.new('TEST_PROXY', proxyData);
      const testProxy = TestProxy.new();
      testProxy.setName('TEST_PROXY');
      testProxy.setData(proxyData);
      facade.registerProxy(testProxy);
      assert(onRegister.called, 'Proxy is not registered');
      onRegister.resetHistory();
      const hasProxy = facade.hasProxy('TEST_PROXY');
      assert(hasProxy, 'Proxy is not registered');
    });
  });
  describe('lazyRegisterProxy', () => {
    let facade = null;
    const INSTANCE_NAME = 'TEST66';
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create new proxy and register it when needed', () => {
      const onRegister = sinon.spy(() => {});

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestProxy extends LeanES.NS.Proxy {
        @nameBy static  __filename = 'TestProxy';
        @meta static object = {};

        @method onRegister() {
            onRegister();
        }
      }

      @initialize
      @partOf(Test)
      class Application extends Test.NS.CoreObject {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
      }

      facade = Test.NS.Facade.getInstance(INSTANCE_NAME);
      const mediator = Test.NS.Mediator.new();
      mediator.setName(APPLICATION_MEDIATOR);
      mediator.setViewComponent(Application.new());
      facade.registerMediator(mediator);
      const proxyData = {data: 'data'};
      facade.lazyRegisterProxy('TEST_PROXY', 'TestProxy', proxyData);
      assert.isFalse(onRegister.called, 'Proxy is already registered');
      onRegister.resetHistory();
      const hasProxy = facade.hasProxy('TEST_PROXY');
      assert(hasProxy, 'Proxy is not registered');
      const testProxy = facade.retrieveProxy('TEST_PROXY');
      assert.instanceOf(testProxy, TestProxy);
      assert(onRegister.called, 'Proxy is not registered')
      onRegister.resetHistory();
    });
  });
  describe('retrieveProxy', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should retrieve registered proxy', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST7');

      @initialize
      class TestProxy extends LeanES.NS.Proxy {
        @nameBy static  __filename = 'TestProxy';
        @meta static object = {};
      }

      const proxyData = {data: 'data'};
      const testProxy = TestProxy.new();
      testProxy.setName('TEST_PROXY');
      testProxy.setData(proxyData);
      facade.registerProxy(testProxy);
      const retrievedProxy = facade.retrieveProxy('TEST_PROXY');
      assert.deepEqual(retrievedProxy, testProxy, 'Proxy cannot be retrieved');
      const retrievedAbsentProxy = facade.retrieveProxy('TEST_PROXY_ABSENT');
      const hasNoAbsentProxy = !retrievedAbsentProxy;
      assert(hasNoAbsentProxy, 'Absent proxy can be retrieved');
    });
  });
  describe('.removeProxy', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create new proxy and register it, after that remove it', async () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST8');
      const onRemove = sinon.spy(() => {});

      @initialize
      class TestProxy extends LeanES.NS.Proxy {
        @nameBy static  __filename = 'TestProxy';
        @meta static object = {};

        @method onRemove() {
          onRemove();
        }
      }
      const proxyData = {data: 'data'};
      const testProxy = TestProxy.new();
      testProxy.setName('TEST_PROXY2');
      testProxy.setData(proxyData);
      facade.registerProxy(testProxy);
      const hasProxy = facade.hasProxy('TEST_PROXY2');
      assert(hasProxy, 'Proxy is not registered');
      await facade.removeProxy('TEST_PROXY2');
      assert(onRemove.called, 'Proxy is still registered');
      const hasNoProxy = !(facade.hasProxy('TEST_PROXY2'));
      assert(hasNoProxy, 'Proxy is still registered');
    });
  });
  describe('.hasProxy', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should retrieve registered proxy', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST9');
      @initialize
      class TestProxy extends LeanES.NS.Proxy {
        @nameBy static  __filename = 'TestProxy';
        @meta static object = {};
      }
      const proxyData = {data: 'data'};
      const testProxy = TestProxy.new();
      testProxy.setName('TEST_PROXY');
      testProxy.setData(proxyData);
      facade.registerProxy(testProxy);
      const hasProxy = facade.hasProxy('TEST_PROXY');
      assert(hasProxy, 'Proxy is absent');
      const hasNoAbsentProxy = !(facade.hasProxy('TEST_PROXY_ABSENT'));
      assert(hasNoAbsentProxy, 'Absent proxy is accessible');
    });
  });
  describe('.registerMediator', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should register new mediator', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST10');
      const onRegister = sinon.spy(() => {});
      const handleNotification = sinon.spy(() => {});
      const viewComponent = {};

      @initialize
      class TestMediator extends LeanES.NS.Mediator {
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

      const mediator = TestMediator.new();
      mediator.setName('TEST_MEDIATOR');
      mediator.setViewComponent(viewComponent);
      facade.registerMediator(mediator);
      assert(onRegister.called, 'Mediator is not registered');
      onRegister.resetHistory();
      facade.notifyObservers(LeanES.NS.Notification.new('TEST_LIST'));
      assert(handleNotification.called, 'Mediator cannot subscribe interests');
    });
  });
  describe('retrieveMediator', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should retrieve registered mediator', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST11');
      const viewComponent = {};

      @initialize
      class TestMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'TestMediator';
        @meta static object = {};
      }

      const mediator = TestMediator.new();
      mediator.setName('TEST_MEDIATOR');
      mediator.setViewComponent(viewComponent);
      facade.registerMediator(mediator);
      const retrievedMediator = facade.retrieveMediator('TEST_MEDIATOR');
      assert.deepEqual(retrievedMediator, mediator, 'Mediator cannot be retrieved');
      const retrievedAbsentMediator = facade.retrieveMediator('TEST_MEDIATOR_ABSENT');
      assert(!retrievedAbsentMediator, 'Retrieve absent mediator');
    });
  });
  describe('.removeMediator', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should create new mediator and register it, after that remove it', async () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST12');
      const onRemove = sinon.spy(() => {});
      const viewComponent = {};

      @initialize
      class TestMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'TestMediator';
        @meta static object = {};

        @method onRemove() {
          onRemove();
        }
      }
      const mediator = TestMediator.new();
      mediator.setName('TEST_MEDIATOR');
      mediator.setViewComponent(viewComponent);
      facade.registerMediator(mediator);
      await facade.removeMediator('TEST_MEDIATOR');
      assert(onRemove.called, 'Mediator onRemove hook not called');
      const hasMediator = facade.hasMediator('TEST_MEDIATOR');
      assert(!hasMediator, 'Mediator didn`t removed');
    });
  });
  describe('.hasMediator', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should retrieve registered mediator', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST13');
      @initialize
      class TestMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'TestMediator';
        @meta static object = {};
      }
      const viewComponent = {};
      const mediator = TestMediator.new();
      mediator.setName('TEST_MEDIATOR');
      mediator.setViewComponent(viewComponent);
      facade.registerMediator(mediator);
      const hasMediator = facade.hasMediator('TEST_MEDIATOR');
      assert(hasMediator, 'Mediator is absent');
      const hasNoAbsentMediator = !(facade.hasMediator('TEST_MEDIATOR_ABSENT'));
      assert(hasNoAbsentMediator, 'Absent mediator is accessible');
    });
  });
  describe('.notifyObservers', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should call notification for all observers', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST14');
      const handleNotification = sinon.spy(() => {});
      const viewComponent = {};

      @initialize
      class TestMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'TestMediator';
        @meta static object = {};
        @method listNotificationInterests() {
          return ['TEST_LIST'];
        }
        @method handleNotification() {
          handleNotification();
        }
      }
      const mediator = TestMediator.new();
      mediator.setName('TEST_MEDIATOR');
      mediator.setViewComponent(viewComponent);
      facade.registerMediator(mediator);
      facade.notifyObservers(LeanES.NS.Notification.new('TEST_LIST'));
      assert(handleNotification.called, 'Mediator cannot subscribe interests');
    });
  });
  describe('.sendNotification', () => {
    let facade = null;
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should send single notification', () => {
      facade = LeanES.NS.Facade.getInstance('FACADE__TEST15');
      const handleNotification = sinon.spy(() => {});
      const viewComponent = {};

      @initialize
      class TestMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'TestMediator';
        @meta static object = {};
        @method listNotificationInterests() {
          return ['TEST_LIST'];
        }
        @method handleNotification() {
          handleNotification();
        }
      }
      const mediator = TestMediator.new();
      mediator.setName('TEST_MEDIATOR');
      mediator.setViewComponent(viewComponent);
      facade.registerMediator(mediator);
      facade.sendNotification('TEST_LIST');
      assert(handleNotification.called, 'Mediator cannot subscribe interests');
    });
  });
  describe('.remove', () => {
    it('should remove facade', async () => {
      const KEY = 'TEST16';
      const facade = LeanES.NS.Facade.getInstance(KEY);
      assert.equal(facade, LeanES.NS.Facade._instanceMap[KEY]);
      await facade.remove();
      assert.isUndefined(LeanES.NS.Facade._instanceMap[KEY]);
    });
  });
  describe('.replicateObject', () => {
    let application = null;
    const KEY = 'TEST17';
    afterEach(async () => {
      return application != null ? typeof application.finish === "function" ? await application.finish() : void 0 : void 0;
    });
    return it('should create replica for facade', async () => {
      @initialize
      @resolver(require, name => require(name))
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends LeanES.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
        @property static _instanceMap = {};
        @method startup(application) {
          this.registerCommand(LeanES.NS.STARTUP, Test.NS.PrepareViewCommand);
          this.sendNotification(LeanES.NS.STARTUP, application);
        }
        @method finish() {}
        @method static getInstance(asKey) {
          if (Test.NS.Facade._instanceMap[asKey] == null) {
            Test.NS.Facade._instanceMap[asKey] = this.new(asKey);
          }
          return Test.NS.Facade._instanceMap[asKey];
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.Application {
        @nameBy static  __filename = 'TestApplication';
        @meta static object = {};
        @property static get NAME(): string {
          return KEY;
        }

        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(TestApplication.NAME, ApplicationFacade);
        }
      }

      @initialize
      @partOf(Test)
      class PrepareViewCommand extends LeanES.NS.Command {
        @nameBy static  __filename = 'PrepareViewCommand';
        @meta static object = {};
        @method execute(aoNotification) {
          const voApplication = aoNotification.getBody();
          const mediator = ApplicationMediator.new();
          mediator.setName(APPLICATION_MEDIATOR);
          mediator.setViewComponent(voApplication);
          this.facade.registerMediator(mediator)
        }
      }
      application = new TestApplication();
      application.start();
      const replica = await ApplicationFacade.replicateObject(application.facade);
      assert.deepEqual(replica, {
        type: 'instance',
        class: 'ApplicationFacade',
        multitonKey: KEY,
        application: 'TestApplication'
      });
    });
  });
  describe('.restoreObject', () => {
    let application = null;
    const KEY = 'TEST18';
    afterEach(async () => {
      return application != null ? typeof application.finish === "function" ? await application.finish() : void 0 : void 0;
    });
    it('should create replica for facade', async () => {
      @initialize
      @resolver(require, name => require(name))
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class ApplicationFacade extends LeanES.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};
        @property static _instanceMap = {};
        @method startup(application) {
          this.registerCommand(LeanES.NS.STARTUP, Test.NS.PrepareViewCommand);
          this.sendNotification(LeanES.NS.STARTUP, application);
        }
        @method finish() {}
        @method static getInstance(asKey) {
          if (Test.NS.Facade._instanceMap[asKey] == null) {
            Test.NS.Facade._instanceMap[asKey] = this.new(asKey);
          }
          return Test.NS.Facade._instanceMap[asKey];
        }
      }

      @initialize
      @partOf(Test)
      class ApplicationMediator extends LeanES.NS.Mediator {
        @nameBy static  __filename = 'ApplicationMediator';
        @meta static object = {};
      }

      @initialize
      @partOf(Test)
      class TestApplication extends LeanES.NS.Application {
        @nameBy static  __filename = 'TestApplication';
        @meta static object = {};
        @property static get NAME(): string {
          return KEY;
        }
        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(TestApplication.NAME, ApplicationFacade);
        }
      }

      @initialize
      @partOf(Test)
      class PrepareViewCommand extends LeanES.NS.Command {
        @nameBy static  __filename = 'PrepareViewCommand';
        @meta static object = {};
        @method execute(aoNotification) {
          const voApplication = aoNotification.getBody();
          const mediator = ApplicationMediator.new();
          mediator.setName(APPLICATION_MEDIATOR);
          mediator.setViewComponent(voApplication);
          this.facade.registerMediator(mediator)
        }
      }
      application = TestApplication.new();
      const restoredFacade = await ApplicationFacade.restoreObject(Test, {
        type: 'instance',
        class: 'ApplicationFacade',
        multitonKey: KEY,
        application: 'TestApplication'
      });
      assert.deepEqual(application.facade, restoredFacade);
    });
  });
});
