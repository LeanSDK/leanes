const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const _ = require('lodash');
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;

describe('StateMachine', () => {
  describe('.new()', () => {
    it('should create new StateMachine instance', () => {
      const stateMachine = LeanES.NS.StateMachine.new('default', {});
      assert.instanceOf(stateMachine, LeanES.NS.StateMachine, 'Cannot instantiate class StateMachine');
    });
  });
  describe('doBeforeAllEvents, doAfterAllEvents, doAfterAllTransitions, doErrorOnAllEvents', () => {
    it('should run all regitstered hooks', async () => {
      const anchor = {
        testBeforeAllEvents: () => { },
        testAfterAllEvents: () => { },
        testAfterAllTransitions: () => { },
        testAfterAllErrors: () => { }
      };
      const spyTestBeforeAllEvents = sinon.spy(anchor, 'testBeforeAllEvents');
      const spyTestAfterAllEvents = sinon.spy(anchor, 'testAfterAllEvents');
      const spyTestAfterAllTransitions = sinon.spy(anchor, 'testAfterAllTransitions');
      const spyAfterAllErrors = sinon.spy(anchor, 'testAfterAllErrors');
      const stateMachine = LeanES.NS.StateMachine.new('testSM', anchor, {
        beforeAllEvents: 'testBeforeAllEvents',
        afterAllEvents: 'testAfterAllEvents',
        afterAllTransitions: 'testAfterAllTransitions',
        errorOnAllEvents: 'testAfterAllErrors'
      });

      try {
        await stateMachine.doBeforeAllEvents();
        await stateMachine.doAfterAllEvents();
        await stateMachine.doAfterAllTransitions();
        throw new Error('test');
      } catch (error1) {
        const error = error1;
        await stateMachine.doErrorOnAllEvents();
      }
      assert.isTrue(spyTestBeforeAllEvents.called, '"beforeAllEvents" method not called');
      assert.isTrue(spyTestAfterAllEvents.called, '"afterAllEvents" method not called');
      assert.isTrue(spyTestAfterAllTransitions.called, '"afterAllTransitions" method not called');
      assert.isTrue(spyAfterAllErrors.called, '"errorOnAllEvents" method not called');
    });
  });
  describe('registerState, removeState', () => {
    it('should register and remove state from SM', () => {
      const anchor = {};
      const stateMachine = LeanES.NS.StateMachine.new('testSM', anchor);
      stateMachine.registerState('test');
      assert.instanceOf(stateMachine.states['test'], LeanES.NS.State, 'State did not registered');
      stateMachine.removeState('test');
      assert.notInstanceOf(stateMachine.states['test'], LeanES.NS.State, 'State did not removed');
    });
  });
  describe('transitionTo, send', () => {
    it('should intialize SM and make one transition', async () => {
      const anchor = {};
      const stateMachine = LeanES.NS.StateMachine.new('testSM', anchor);
      stateMachine.registerState('test1', {
        initial: true
      });
      stateMachine.registerState('test2');
      stateMachine.registerEvent('testEvent', 'test1', 'test2');
      await stateMachine.reset();
      assert.equal(stateMachine.currentState.name, 'test1', 'SM did not initialized');
      await stateMachine.send('testEvent');
      assert.equal(stateMachine.currentState.name, 'test2', 'State did not changed');
    });
  });
  describe('send, doXXX', () => {
    it('should intialize SM and hooks and make one transition', async () => {
      const anchor = {
        testValue: 'test',
        testBeforeAllEvents: sinon.spy(() => { }),
        testEventBefore: sinon.spy(() => { }),
        testEventGuard: sinon.spy(function () {
          return this.testValue === 'test';
        }),
        testTransitionGuard: sinon.spy(function () {
          return this.testValue === 'test';
        }),
        testOldStateBeforeExit: sinon.spy(() => { }),
        testOldStateExit: sinon.spy(() => { }),
        testAfterAllTransitions: sinon.spy(() => { }),
        testTransitionAfter: sinon.spy(() => { }),
        testNewStateBeforeEnter: sinon.spy(() => { }),
        testNewStateEnter: sinon.spy(() => { }),
        testTransitionSuccess: sinon.spy(() => { }),
        testOldStateAfterExit: sinon.spy(() => { }),
        testNewStateAfterEnter: sinon.spy(() => { }),
        testEventSuccess: sinon.spy(() => { }),
        testEventAfter: sinon.spy(() => { }),
        testAfterAllEvents: sinon.spy(() => { }),
        testEventError: sinon.spy(() => { }),
        testErrorOnAllEvents: sinon.spy(() => { }),
        testBeforeReset: sinon.spy(() => { }),
        testAfterReset: sinon.spy(() => { }),
        testwithAnchorUpdateState: sinon.spy(() => { }),
        testwithAnchorSave: sinon.spy(() => { })
      };
      const oldStateConfig = {
        initial: true,
        beforeExit: 'testOldStateBeforeExit',
        exit: 'testOldStateExit',
        afterExit: 'testOldStateAfterExit'
      };
      const newStateConfig = {
        initial: false,
        beforeEnter: 'testNewStateBeforeEnter',
        enter: 'testNewStateEnter',
        afterEnter: 'testNewStateAfterEnter'
      };
      const transitionConfig = {
        guard: 'testTransitionGuard',
        after: 'testTransitionAfter',
        success: 'testTransitionSuccess'
      };
      const eventConfig = {
        guard: 'testEventGuard',
        before: 'testEventBefore',
        success: 'testEventSuccess',
        after: 'testEventAfter',
        error: 'testEventError'
      };
      const smConfig = {
        beforeReset: 'testBeforeReset',
        afterReset: 'testAfterReset',
        beforeAllEvents: 'testBeforeAllEvents',
        afterAllEvents: 'testAfterAllEvents',
        afterAllTransitions: 'testAfterAllTransitions',
        errorOnAllEvents: 'testErrorOnAllEvents',
        withAnchorUpdateState: 'testwithAnchorUpdateState',
        withAnchorSave: 'testwithAnchorSave'
      };
      const sm = LeanES.NS.StateMachine.new('testStateMachine', anchor, smConfig);
      sm.registerState('oldState', oldStateConfig);
      sm.registerState('newState', newStateConfig);
      sm.registerEvent('testEvent', 'oldState', 'newState', eventConfig, transitionConfig);
      await sm.reset();
      assert.equal(sm.currentState.name, 'oldState', 'SM did not initialized');
      await sm.send('testEvent', 'testArgument1', 'testArgument2');
      assert.equal(sm.currentState.name, 'newState', 'State did not changed');
      const hasProp = {}.hasOwnProperty;
      for (const key in anchor) {
        if (!hasProp.call(anchor, key)) continue;
        const property = anchor[key];
        if (_.isFunction(property)) {
          if (/error/i.test(key)) {
            assert.isFalse(property.called, `anchor.${key} called`);
          } else {
            if (/reset|with/i.test(key)) {
              assert.isTrue(property.called, `anchor.${key} did not called (1)`);
            } else {
              assert.isTrue(property.calledWith('testArgument1', 'testArgument2'), `anchor.${key} did not called (2)`);
            }
          }
        }
      }
    });
    it('should intialize SM and hooks, restore state and make one transition', async () => {
      const anchor = {
        state: 'restoredState',
        testValue: 'test',
        testBeforeAllEvents: sinon.spy(() => { }),
        testEventBefore: sinon.spy(() => { }),
        testEventGuard: sinon.spy(function ()  {
          return this.testValue === 'test';
        }),
        testTransitionGuard: sinon.spy(function ()  {
          return this.testValue === 'test';
        }),
        testOldStateBeforeExit: sinon.spy(() => { }),
        testOldStateExit: sinon.spy(() => { }),
        testAfterAllTransitions: sinon.spy(() => { }),
        testTransitionAfter: sinon.spy(() => { }),
        testNewStateBeforeEnter: sinon.spy(() => { }),
        testNewStateEnter: sinon.spy(() => { }),
        testTransitionSuccess: sinon.spy(() => { }),
        testOldStateAfterExit: sinon.spy(() => { }),
        testNewStateAfterEnter: sinon.spy(() => { }),
        testEventSuccess: sinon.spy(() => { }),
        testEventAfter: sinon.spy(() => { }),
        testAfterAllEvents: sinon.spy(() => { }),
        testEventError: sinon.spy(() => { }),
        testErrorOnAllEvents: sinon.spy(() => { }),
        testBeforeReset: sinon.spy(() => { }),
        testAfterReset: sinon.spy(() => { }),
        testwithAnchorUpdateState: sinon.spy(function (stateName) {
          return this.state = stateName;
        }),
        testwithAnchorRestoreState: sinon.spy(function () {
          return this.state;
        }),
        testwithAnchorSave: sinon.spy(() => { })
      };
      const oldStateConfig = {
        initial: true,
        beforeExit: 'testOldStateBeforeExit',
        exit: 'testOldStateExit',
        afterExit: 'testOldStateAfterExit'
      };
      const newStateConfig = {
        initial: false,
        beforeEnter: 'testNewStateBeforeEnter',
        enter: 'testNewStateEnter',
        afterEnter: 'testNewStateAfterEnter'
      };
      const restoredStateConfig = {
        initial: false,
        beforeExit: 'testOldStateBeforeExit',
        exit: 'testOldStateExit',
        afterExit: 'testOldStateAfterExit'
      };
      const transitionConfig = {
        guard: 'testTransitionGuard',
        after: 'testTransitionAfter',
        success: 'testTransitionSuccess'
      };
      const eventConfig = {
        guard: 'testEventGuard',
        before: 'testEventBefore',
        success: 'testEventSuccess',
        after: 'testEventAfter',
        error: 'testEventError'
      };
      const smConfig = {
        beforeReset: 'testBeforeReset',
        afterReset: 'testAfterReset',
        beforeAllEvents: 'testBeforeAllEvents',
        afterAllEvents: 'testAfterAllEvents',
        afterAllTransitions: 'testAfterAllTransitions',
        errorOnAllEvents: 'testErrorOnAllEvents',
        withAnchorUpdateState: 'testwithAnchorUpdateState',
        withAnchorRestoreState: 'testwithAnchorRestoreState',
        withAnchorSave: 'testwithAnchorSave'
      };
      const sm = LeanES.NS.StateMachine.new('testStateMachine', anchor, smConfig);
      sm.registerState('oldState', oldStateConfig);
      sm.registerState('restoredState', restoredStateConfig);
      sm.registerState('newState', newStateConfig);
      sm.registerEvent('testEvent', ['oldState', 'restoredState'], 'newState', eventConfig, transitionConfig);
      await sm.reset();
      assert.equal(sm.currentState.name, 'restoredState', 'SM did not initialized');
      await sm.send('testEvent', 'testArgument1', 'testArgument2');
      assert.equal(sm.currentState.name, 'newState', 'State did not changed');
      const hasProp = {}.hasOwnProperty;
      for (const key in anchor) {
        if (!hasProp.call(anchor, key)) continue;
        const property = anchor[key];
        if (_.isFunction(property)) {
          if (/error/i.test(key)) {
            assert.isFalse(property.called, `anchor.${key} called`);
          } else {
            if (/reset|with/i.test(key)) {
              assert.isTrue(property.called, `anchor.${key} did not called (1)`);
            } else {
              assert.isTrue(property.calledWith('testArgument1', 'testArgument2'), `anchor.${key} did not called (2)`);
            }
          }
        }
      }
    });
  });
});
