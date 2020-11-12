// This file is part of LeanES.
//
// LeanES is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// LeanES is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with LeanES.  If not, see <https://www.gnu.org/licenses/>.

/*
State instances for StateMachine class

Inspiration:

- https://github.com/PureMVC/puremvc-js-util-statemachine
- https://github.com/aasm/aasm
*/

export type { TransitionInterface } from '../interfaces/TransitionInterface';
export type { EventInterface } from '../interfaces/EventInterface';
export type { StateInterface } from '../interfaces/StateInterface';
export type { StateMachineInterface } from '../interfaces/StateMachineInterface';

const splice = [].splice;

export default (Module) => {
  const {
    HookedObject,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;


  @initialize
  @partOf(Module)
  class State extends HookedObject implements StateInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _stateMachine: ?StateMachineInterface = null;

    @property _events: {[key: string]: ?EventInterface} = null;

    @property _beforeEnter: ?string = null;

    @property _enter: ?string = null;

    @property _afterEnter: ?string = null;

    @property _beforeExit: ?string = null;

    @property _exit: ?string = null;

    @property _afterExit: ?string = null;

    @property initial: boolean = false;

    @method getEvents(): {[key: string]: ?EventInterface} {
      return this._events;
    }

    @method getEvent(asEvent: string): ?EventInterface {
      return this._events[asEvent];
    }

    @method defineTransition(asEvent: string, aoTarget: StateInterface, aoTransition: TransitionInterface, config: ?object = {}): EventInterface {
      if (this._events[asEvent] == null) {
        const vpoAnchor = this._anchor;
        const vhEventConfig = _.assign({}, config, {
          target: aoTarget,
          transition: aoTransition
        });
        const vsEventName = `${this.name}_${asEvent}`;
        this._events[asEvent] = this.Module.NS.Event.new(vsEventName, vpoAnchor, vhEventConfig);
      }
      return this._events[asEvent];
    }

    @method removeTransition(asEvent: string) {
      if (this._events[asEvent] != null) {
        delete this._events[asEvent];
      }
    }

    @method async doBeforeEnter(...args): Promise<?any> {
      return (await this._doHook(this._beforeEnter, args, 'Specified "beforeEnter" not found', args));
    }

    @method async doEnter(...args): Promise<?any> {
      return (await this._doHook(this._enter, args, 'Specified "enter" not found', args));
    }

    @method async doAfterEnter(...args): Promise<?any> {
      return (await this._doHook(this._afterEnter, args, 'Specified "afterEnter" not found', args));
    }

    @method async doBeforeExit(...args): Promise<?any> {
      return (await this._doHook(this._beforeExit, args, 'Specified "beforeExit" not found', args));
    }

    @method async doExit(...args): Promise<?any> {
      return (await this._doHook(this._exit, args, 'Specified "exit" not found', args));
    }

    @method async doAfterExit(...args): Promise<?any> {
      return (await this._doHook(this._afterExit, args, 'Specified "afterExit" not found', args));
    }

    @method async send(asEvent: string, ...args): Promise<void> {
      const oldState = this;
      const event = oldState._events[asEvent];
      if (event != null) {
        try {
          await event.doBefore(...args);
          const eventGuard = (await event.testGuard(...args));
          const eventIf = (await event.testIf(...args));
          const eventUnless = (await event.testUnless(...args));
          if (eventGuard && eventIf && !eventUnless) {
            const { transition } = event;
            const transitionGuard = (await transition.testGuard(...args));
            const transitionIf = (await transition.testIf(...args));
            const transitionUnless = (await transition.testUnless(...args));
            if (transitionGuard && transitionIf && !transitionUnless) {
              await oldState.doBeforeExit(...args);
              await oldState.doExit(...args);
              const stateMachine = oldState._stateMachine;
              await stateMachine.transitionTo(event.target, transition, ...args);
            }
            await event.doSuccess(...args);
          }
          await event.doAfter(...args);
        } catch (error) {
          await event.doError(error);
          throw error;
        }
      }
    }

    constructor(name: string, anchor: object, aoStateMachine: StateMachineInterface, ...args1) {
      let config, ref;
      ref = args1, [...args1] = ref, [config] = splice.call(args1, -1);
      if (config === undefined) {
        config = {};
      }
      super(... arguments);
      this._events = {};
      this._stateMachine = aoStateMachine;
      ({
        beforeEnter: this._beforeEnter,
        enter: this._enter,
        afterEnter: this._afterEnter,
        beforeExit: this._beforeExit,
        exit: this._exit,
        afterExit: this._afterExit
      } = config);
      this.initial = config.initial === true;
    }
  }
}
