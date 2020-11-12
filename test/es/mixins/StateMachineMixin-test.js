const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;
const {
  CoreObject,
  initialize, partOf, nameBy, meta, mixin, machine
} = LeanES.NS;

describe('StateMachineMixin', () => {
  describe('include StateMachineMixin', () => {
    it('should create new class with state machine and instantiate', () => {
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @mixin(LeanES.NS.StateMachineMixin)
        @partOf(Test)
        class MyClass extends LeanES.NS.CoreObject {
          @meta static object = {};
        }

        const myInstance = MyClass.new();
        assert.instanceOf(myInstance, Test.NS.MyClass, 'Cannot instantiate class MyClass');
      }).to.not.throw(Error);
    });
  });
  describe('include and initialize StateMachineMixin', () => {
    it('should create new class with state machine and initialize default state machine', () => {
      const spySMConfig = sinon.spy(() => { });
      expect(() => {
        @initialize
        class Test extends LeanES {
          @nameBy static  __filename = 'Test';
          @meta static object = {};
        }

        @initialize
        @mixin(LeanES.NS.StateMachineMixin)
        @partOf(Test)
        @machine('default', spySMConfig)
        class MyClass extends LeanES.NS.CoreObject {
          @meta static object = {};
        }

        const myInstance = MyClass.new();
        assert.instanceOf(myInstance, Test.NS.MyClass, 'Cannot instantiate class MyClass');
        assert.isTrue(spySMConfig.called, 'Initializer did not called');
      }).to.not.throw(Error);
    });
  });
  describe('test hooks in StateMachineMixin', () => {
    it('should initialize and call hooks', async () => {
      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.StateMachineMixin)
      @partOf(Test)
      @machine('default', function () {
        this.beforeAllEvents('testBeforeAllEvents');
        this.afterAllTransitions('testAfterAllTransitions');
        this.afterAllEvents('testAfterAllEvents');
        this.errorOnAllEvents('testErrorOnAllEvents');
        this.state('oldState', {
          initial: true,
          beforeExit: 'testOldStateBeforeExit',
          afterExit: 'testOldStateAfterExit'
        });
        this.state('newState', {
          beforeEnter: 'testNewStateBeforeEnter',
          afterEnter: 'testNewStateAfterEnter'
        });
        this.event('testEvent', {
          before: 'testEventBefore',
          after: 'testEventAfter',
          error: 'testEventError'
        }, () => {
          this.transition(['oldState'], 'newState', {
            guard: 'testTransitionGuard',
            after: 'testTransitionAfter'
          });
        });
      })
      class MyClass extends LeanES.NS.CoreObject {
        @meta static object = {};

        testValue = 'test';
        testBeforeAllEvents = sinon.spy(() => { });
        testEventBefore = sinon.spy(() => { });
        testTransitionGuard = sinon.spy(() => {
          return this.testValue === 'test';
        });
        testOldStateBeforeExit = sinon.spy(() => { });
        testAfterAllTransitions = sinon.spy(() => { });
        testTransitionAfter = sinon.spy(() => { });
        testNewStateBeforeEnter = sinon.spy(() => { });
        testOldStateAfterExit = sinon.spy(() => { });
        testNewStateAfterEnter = sinon.spy(() => { });
        testEventAfter = sinon.spy(() => { });
        testAfterAllEvents = sinon.spy(() => { });
        testEventError = sinon.spy(() => { });
        testErrorOnAllEvents = sinon.spy(() => { });
      }

      const myInstance = MyClass.new();
      await myInstance.resetDefault();
      await myInstance.testEvent();
      assert.instanceOf(myInstance.getStateMachine('default'), LeanES.NS.StateMachine, 'Cannot create state machine');
      assert.isTrue(myInstance.testBeforeAllEvents.called, 'testBeforeAllEvents did not called');
      assert.isTrue(myInstance.testEventBefore.called, 'testEventBefore did not called');
      assert.isTrue(myInstance.testTransitionGuard.called, 'testTransitionGuard did not called');
      assert.isTrue(myInstance.testOldStateBeforeExit.called, 'testOldStateBeforeExit did not called');
      assert.isTrue(myInstance.testAfterAllTransitions.called, 'testAfterAllTransitions did not called');
      assert.isTrue(myInstance.testTransitionAfter.called, 'testTransitionAfter did not called');
      assert.isTrue(myInstance.testNewStateBeforeEnter.called, 'testNewStateBeforeEnter did not called');
      assert.isTrue(myInstance.testOldStateAfterExit.called, 'testOldStateAfterExit did not called');
      assert.isTrue(myInstance.testNewStateAfterEnter.called, 'testNewStateAfterEnter did not called');
      assert.isTrue(myInstance.testEventAfter.called, 'testEventAfter did not called');
      assert.isTrue(myInstance.testAfterAllEvents.called, 'testAfterAllEvents did not called');
      assert.isFalse(myInstance.testEventError.called, 'testEventError called');
      assert.isFalse(myInstance.testErrorOnAllEvents.called, 'testErrorOnAllEvents called');
    });
  });
  describe('test emitter in StateMachineMixin', () => {
    it('should initialize and call emitter hook', async () => {
      const testEmit = sinon.spy(() => { });

      @initialize
      class Test extends LeanES {
        @nameBy static  __filename = 'Test';
        @meta static object = {};
      }

      @initialize
      @mixin(LeanES.NS.StateMachineMixin)
      @partOf(Test)
      @machine('default', function () {
        this.errorOnAllEvents('testErrorOnAllEvents');
        this.state('oldState', {
          initial: true,
          afterExit: 'testOldStateAfterExit'
        });
        this.state('newState', {
          beforeEnter: 'testNewStateBeforeEnter'
        });
        this.event('testEvent', {
          before: 'testEventBefore'
        }, () => {
          this.transition(['oldState'], 'newState', {
            guard: 'testTransitionGuard',
            after: 'testTransitionAfter'
          });
        });
      })
      class MyClass extends LeanES.NS.CoreObject {
        @meta static object = {};

        emit = testEmit;
        testValue = 'test';
        testEventBefore = sinon.spy(() => { });
        testTransitionGuard = sinon.spy(() => {
          return this.testValue === 'test';
        });
        testTransitionAfter = sinon.spy(() => { });
        testNewStateBeforeEnter = 'TestNotification';
        testOldStateAfterExit = sinon.spy(() => { });
        testErrorOnAllEvents = sinon.spy(() => { });
      }

      const myInstance = MyClass.new();
      await myInstance.resetDefault();
      await myInstance.testEvent('testArgument1', 'testArgument2');
      assert.instanceOf(myInstance.getStateMachine('default'), LeanES.NS.StateMachine, 'Cannot create state machine');
      assert.isTrue(myInstance.testEventBefore.called, 'testEventBefore did not called');
      assert.isTrue(myInstance.testTransitionGuard.called, 'testTransitionGuard did not called');
      assert.isTrue(myInstance.testTransitionAfter.calledWith('testArgument1', 'testArgument2'), 'testTransitionAfter did not called');
      assert.isTrue(testEmit.calledWith('TestNotification'), '"emit" not called with "TestNotification"');
      assert.isTrue(myInstance.testOldStateAfterExit.called, 'testOldStateAfterExit did not called');
      assert.isFalse(myInstance.testErrorOnAllEvents.called, 'testErrorOnAllEvents called');
    });
  });
});
