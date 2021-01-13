const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const assert = chai.assert;
const path = process.env.ENV === 'build' ? "../../../lib/index.dev" : "../../../src/index.js";
const LeanES = require(path).default;

describe('Event', () => {
  describe('.new()', () => {
    it('should create new Event instance', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const event = LeanES.NS.Event.new('newEvent', {}, { transition, target });
        assert.instanceOf(event, LeanES.NS.Event, 'Cannot instantiate class Event');
        assert.equal(event.name, 'newEvent');
      }).to.not.throw(Error);
    });
  });
  describe('testGuard', () => {
    it('should get "guard" without rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testGuard: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testGuard');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          guard: 'testGuard'
        });
        event.testGuard().then(() => {
          assert.isTrue(spyTestGuard.called, '"guard" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "guard" with rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testGuard1: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testGuard1');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          guard: 'testGuard'
        });
        event.testGuard().then(() => {
          throw new Error('Found unexpected "guard"');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "guard" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestGuard.called, '"guard" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('testIf', () => {
    it('should get "if" without rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testIf: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testIf');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          if: 'testIf'
        });
        event.testIf().then(() => {
          assert(spyTestGuard.called, '"if" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "if" with rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testIf1: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testIf1');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          if: 'testIf'
        });
        event.testIf().then(() => {
          throw new Error('Found unexpected "if"');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "if" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestGuard.called, '"if" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('testUnless', () => {
    it('should get "unless" without rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testUnless: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testUnless');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          unless: 'testUnless'
        });
        event.testUnless().then(() => {
          assert(spyTestGuard.called, '"unless" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "unless" with rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testUnless1: () => { }
        };
        const spyTestGuard = sinon.spy(anchor, 'testUnless1');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          unless: 'testUnless'
        });
        event.testUnless().then(() => {
          throw new Error('Found unexpected "unless"');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "unless" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestGuard.called, '"unless" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('doAfter', () => {
    it('should get "after" without rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testAfter: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          after: 'testAfter'
        });
        event.doAfter().then(() => {
          assert(spyTestAfter.called, '"after" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "after" with rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testAfter1: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter1');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          after: 'testAfter'
        });
        event.doAfter().then(() => {
          throw new Error('Found unexpected after');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "after" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestAfter.called, '"after" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('doBefore', () => {
    it('should get "before" without rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testBefore: () => { }
        };
        const spyTestBefore = sinon.spy(anchor, 'testBefore');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          before: 'testBefore'
        });
        event.doBefore().then(() => {
          assert.isTrue(spyTestBefore.called, '"before" method not called');
        });
      }).to.not.throw(Error);
    });
    it('should get "before" with rejects', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testBefore1: () => { }
        };
        const spyTestBefore = sinon.spy(anchor, 'testBefore1');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          before: 'testBefore'
        });
        event.doBefore().then(() => {
          throw new Error('Found unexpected before');
        }).catch((e) => {
          assert.equal(e.message, 'Specified "before" not found', e.message);
        }).then(() => {
          assert.isFalse(spyTestBefore.called, '"before" method was called');
        });
      }).to.not.throw(Error);
    });
  });
  describe('doBefore, doAfter', () => {
    it('should run "before" before "after"', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          testBefore: () => { },
          testAfter: () => { }
        };
        const spyTestBefore = sinon.spy(anchor, 'testBefore');
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          before: 'testBefore',
          after: 'testAfter'
        });
        (async () => {
          await event.doBefore();
          await event.doAfter();
          assert.isTrue(spyTestBefore.called, '"before" method not called');
          assert.isTrue(spyTestAfter.calledAfter(spyTestBefore), '"after" not called after "before"');
        })()

      }).to.not.throw(Error);
    });
  });
  describe('testGuard, doAfter, doSuccess, doError', () => {
    it('should run "after" only if "guard" resolved as true', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          test: 'test',
          testGuard: function () {
            return this.test === 'test';
          },
          testAfter: () => { },
          testSuccess: () => { },
          testError: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const spyTestSuccess = sinon.spy(anchor, 'testSuccess');
        const spyTestError = sinon.spy(anchor, 'testError');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          guard: 'testGuard',
          after: 'testAfter',
          success: 'testSuccess',
          error: 'testError'
        });
        (async () => {
          try {
            if (await event.testGuard()) {
              await event.doSuccess();
              await event.doAfter();
            }
            throw new Error('test');
          } catch (error) {
            const e = error;
            await event.doError(e);
          }
          assert.isTrue(spyTestAfter.called, '"after" method not called');
          assert.isTrue(spyTestSuccess.called, '"success" method not called');
          assert.isTrue(spyTestError.called, '"error" method not called');
        })()
      }).to.not.throw(Error);
    });
    it('should run "after" only if "unless" resolved as false', () => {
      expect(() => {
        const stateMachine = LeanES.NS.StateMachine.new('default', {});
        const transition = LeanES.NS.Transition.new('newTransition', {}, {});
        const target = LeanES.NS.State.new('newState', {}, stateMachine, {});
        const anchor = {
          test: 'test',
          testUnless: function () {
            return this.test === 'not-test';
          },
          testAfter: () => { },
          testSuccess: () => { },
          testError: () => { }
        };
        const spyTestAfter = sinon.spy(anchor, 'testAfter');
        const spyTestSuccess = sinon.spy(anchor, 'testSuccess');
        const spyTestError = sinon.spy(anchor, 'testError');
        const event = LeanES.NS.Event.new('newEvent', anchor, {
          transition,
          target,
          unless: 'testUnless',
          after: 'testAfter',
          success: 'testSuccess',
          error: 'testError'
        });
        (async () => {
          try {
            if (!(await event.testUnless())) {
              await event.doSuccess();
              await event.doAfter();
            }
            throw new Error('test');
          } catch (error) {
            const e = error;
            await event.doError(e);
          }
          assert.isTrue(spyTestAfter.called, '"after" method not called');
          assert.isTrue(spyTestSuccess.called, '"success" method not called');
          assert.isTrue(spyTestError.called, '"error" method not called');
        })()
      }).to.not.throw(Error);
    });
  });
});
