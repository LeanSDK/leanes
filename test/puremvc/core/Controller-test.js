const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  APPLICATION_MEDIATOR,
  Controller, Command, Notification,
  initialize, partOf, nameBy, meta, method, property,
  Utils: { inversify: { Container } }
} = LeanES.NS;

describe('Controller', () => {
  describe('.getInstance', () => {
    it('should get new or exiciting instance of Controller', () => {
      expect(() => {
        const controller = Controller.getInstance('CONTROLLER__TEST1', new Container());
        if(!(controller instanceof Controller)) {
          throw new Error('The `controller` is not an instance of Controller');
        }
      }).to.not.throw(Error);
    });
  });
  describe('.removeController', () => {
    it('should get new instance of Controller, remove it and get new one', () => {
      expect(() => {
        const controller = Controller.getInstance('CONTROLLER__TEST2', new Container());
        Controller.removeController('CONTROLLER__TEST2');
        const newController = Controller.getInstance('CONTROLLER__TEST2', new Container());
        if(controller === newController) {
          throw new Error('Controller instance didn`t renewed')
        }
      }).to.not.throw(Error);
    });
  });
  describe('.registerCommand', () => {
    it('should register new command', () => {
      expect(() => {
        const controller = Controller.getInstance('CONTROLLER__TEST3', new Container());
        @initialize
        class TestCommand extends Command {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
          @method execute() {}
        }
        controller.registerCommand('TEST_COMMAND', TestCommand);
        assert(controller.hasCommand('TEST_COMMAND'));
      }).to.not.throw(Error);
    });
  });
  describe('.lazyRegisterCommand', () => {
    let facade = null;
    const INSTANCE_NAME = 'CONTROLLER__TEST999';
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
      class ApplicationFacade extends LeanES.NS.Facade {
        @nameBy static  __filename = 'ApplicationFacade';
        @meta static object = {};

        @method initializeFacade(): void {
          super.initializeFacade();
          this.rebind('ApplicationModule').toConstructor(this.Module);
        }
      }

      @initialize
      @partOf(Test)
      class TestCommand extends Command {
        @nameBy static  __filename = 'TestCommand';
        @meta static object = {};

        @method execute() {
          spy();
        }
      }
      // @initialize
      // @partOf(Test)
      // class Application extends Test.NS.CoreObject {
      //   @nameBy static  __filename = 'Application';
      //   @meta static object = {};
      // }
      facade = Test.NS.ApplicationFacade.getInstance(INSTANCE_NAME);
      const controller = facade._controller;
      // const mediator = Test.NS.Mediator.new();
      // mediator.setName(APPLICATION_MEDIATOR);
      // mediator.setViewComponent(Application.new());
      // facade.registerMediator(mediator);
      let notification = new Notification('TEST_COMMAND2');
      controller.lazyRegisterCommand(notification.getName(), 'TestCommand');
      assert(controller.hasCommand(notification.getName()));
      controller.executeCommand(notification);
      assert(spy.called);
      spy.resetHistory();
      notification = new Notification('TestCommand');
      controller.lazyRegisterCommand(notification.getName());
      assert(controller.hasCommand(notification.getName()));
      controller.executeCommand(notification);
      assert(spy.called);
    });
  });
  describe('.executeCommand', () => {
    let facade = null;
    const INSTANCE_NAME = 'CONTROLLER__TEST4';
    afterEach(async () => {
      facade != null ? typeof facade.remove === "function" ? await facade.remove() : void 0 : void 0;
    });
    it('should register new command and call it', () => {
      expect(() => {
        const spy = sinon.spy();
        spy.resetHistory();

        @initialize
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @partOf(Test)
        class ApplicationFacade extends LeanES.NS.Facade {
          @nameBy static  __filename = 'ApplicationFacade';
          @meta static object = {};

          @method initializeFacade(): void {
            super.initializeFacade();
            this.rebind('ApplicationModule').toConstructor(this.Module);
          }
        }

        @initialize
        class TestCommand extends Command {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
          @method execute() {
            spy();
          }
        }

        facade = Test.NS.ApplicationFacade.getInstance(INSTANCE_NAME);
        const controller = facade._controller;

        let notification = new Notification('TEST_COMMAND1');
        controller.registerCommand(notification.getName(), TestCommand);
        controller.executeCommand(notification);
        assert(spy.called);
      }).to.not.throw(Error);
    });
  });
  describe('.removeCommand', () => {
    it('should remove command if present', () => {
      expect(() => {
        const controller = Controller.getInstance('CONTROLLER__TEST5', new Container());
        @initialize
        class TestCommand extends Command {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
          @method execute() {}
        }
        controller.removeCommand('TEST_COMMAND');
        controller.removeCommand('TEST_COMMAND1');
        assert(!controller.hasCommand('TEST_COMMAND'))
        assert(!controller.hasCommand('TEST_COMMAND1'))
      }).to.not.throw(Error);
    });
  });
  describe('.hasCommand', () => {
    it('should has command', () => {
      expect(() => {
        const controller = Controller.getInstance('CONTROLLER__TEST6', new Container());
        @initialize
        class TestCommand extends Command {
          @nameBy static  __filename = 'TestCommand';
          @meta static object = {};
        }
        controller.registerCommand('TEST_COMMAND', TestCommand);
        assert(controller.hasCommand('TEST_COMMAND'))
        assert(!controller.hasCommand('TEST_COMMAND_ABSENT'))
      }).to.not.throw(Error);
    });
  });
});
