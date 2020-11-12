const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'dev' ? "../../../lib/index.dev" : "../../../src/leanes/index.js";
const LeanES = require(path).default;

describe('State', () => {
  describe('.new()', () => {
    it('should create new State instance', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const state = LeanES.NS.State.new('newState', {}, stateMachine, {});
        assert.instanceOf(state, LeanES.NS.State, 'Cannot instantiate class State');
        assert.equal(state.name, 'newState');
      }).to.not.throw(Error);
    });
  });
  describe('defineTransition, removeTransition', () => {
    it('should successfully define transition and remove it', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const state1 = LeanES.NS.State.new('newState1', {}, stateMachine, {});
        const state2 = LeanES.NS.State.new('newState2', {}, stateMachine, {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        state1.defineTransition('test', state2, transition);
        assert.isDefined(state1.getEvent('test'), 'No added transition');
        state1.removeTransition('test');
        assert.isUndefined(state1.getEvent('test'), 'Not removed transition');
      }).to.not.throw(Error);
    });
  });
  describe('doBeforeEnter, doEnter, doAfterEnter, doBeforeExit, doExit, doAfterExit', () => {
    it('should run hooks by order if present', async () => {
      const anchor = {
        testBeforeEnter: () => { },
        testEnter: () => { },
        testAfterEnter: () => { },
        testBeforeExit: () => { },
        testExit: () => { },
        testAfterExit: () => { }
      };
      const spyTestBeforeEnter = sinon.spy(anchor, 'testBeforeEnter');
      const spyTestEnter = sinon.spy(anchor, 'testEnter');
      const spyTestAfterEnter = sinon.spy(anchor, 'testAfterEnter');
      const spyTestBeforeExit = sinon.spy(anchor, 'testBeforeExit');
      const spyTestExit = sinon.spy(anchor, 'testExit');
      const spyTestAfterExit = sinon.spy(anchor, 'testAfterExit');
      const stateMachine = LeanES.NS.StateMachine.new('default', {});
      const state = LeanES.NS.State.new('newTransition', anchor, stateMachine, {
        beforeEnter: 'testBeforeEnter',
        afterEnter: 'testAfterEnter',
        exit: 'testExit'
      });
      await state.doBeforeEnter();
      await state.doEnter();
      await state.doAfterEnter();
      await state.doBeforeExit();
      await state.doExit();
      await state.doAfterExit();
      assert(spyTestBeforeEnter.called, '"beforeEnter" method not called');
      assert.isFalse(spyTestEnter.called, '"enter" method called');
      assert(spyTestAfterEnter.called, '"afterEnter" method not called');
      assert.isFalse(spyTestBeforeExit.called, '"beforeExit" method called');
      assert(spyTestExit.called, '"exit" method not called');
      assert.isFalse(spyTestAfterExit.called, '"afterExit" method called');
      });
  });
});
