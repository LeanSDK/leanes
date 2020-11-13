const { assert } = require('chai');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;
const {
  FacadeInterface,
  initialize, partOf, nameBy, meta, method, property
} = LeanES.NS;

describe('Application', () => {
  describe('start', () => {
    let application = null;
    afterEach(async () => {
      return application != null ? typeof application.finish === "function" ? await application.finish() : void 0 : void 0;
    });
    it('should create new Application instance', () => {
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
        @property static _instanceMap = {};
        @property isInitialized: boolean = false;
        @method startup(...args) {
          super.startup(...args);
          if (!this.isInitialized) {
            this.isInitialized = true;
          }
        }
      }

      @initialize
      @partOf(Test)
      class Application extends LeanES.NS.Application {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
        @property static get NAME(): string {
          return 'TestApplication1';
        }
        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(Application.NAME, ApplicationFacade);
        }
      }

      application = Application.new();
      assert.instanceOf(application, Application);
      assert.instanceOf(application.facade, ApplicationFacade);
    });
  });
  describe('finish', () => {
    it('should deactivate application', async () => {
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
        @property static _instanceMap = {};
        @property isInitialized: boolean = false;
        @method startup(...args) {
          super.startup(...args);
          if (!this.isInitialized) {
            this.isInitialized = true;
          }
        }
      }

      @initialize
      @partOf(Test)
      class Application extends LeanES.NS.Application {
        @nameBy static  __filename = 'Application';
        @meta static object = {};
        @property static get NAME(): string {
          return 'TestApplication2';
        }
        constructor() {
          const { ApplicationFacade } = Test.NS;
          super(Application.NAME, ApplicationFacade);
        }
      }
      const application = Application.new();
      assert.instanceOf(application, Application);
      assert.instanceOf(application.facade, ApplicationFacade);
      assert.isDefined(LeanES.NS.Facade._instanceMap[Application.NAME]);
      await application.finish();
      assert.isUndefined(LeanES.NS.Facade._instanceMap[Application.NAME]);
    });
  });
});
