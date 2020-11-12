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
Stand-alone or mixed-in class (via StateMachineMixin)

Inspiration:

- https://github.com/PureMVC/puremvc-js-util-statemachine
- https://github.com/aasm/aasm
*/

import type { TransitionInterface } from '../interfaces/TransitionInterface';
import type { StateInterface } from '../interfaces/StateInterface';
import type { StateMachineInterface } from '../interfaces/StateMachineInterface';

const splice = [].splice;

export default (Module) => {
  const {
    HookedObject,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;

  @initialize
  @partOf(Module)
  class StateMachine extends HookedObject implements StateMachineInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property currentState: ?StateInterface = null;

    @property initialState: ?StateInterface = null;

    @property states: {[key: string]: ?StateInterface} = null;

    @property _transitionConfigs: ?Array<{|previousStates: string[], nextState: string, config: ?object|}> = null;

    @property _beforeReset: ?string = null;

    @property _afterReset: ?string = null;

    @property _beforeAllEvents: ?string = null;

    @property _afterAllEvents: ?string = null;

    @property _afterAllTransitions: ?string = null;

    @property _errorOnAllEvents: ?string = null;

    @property _withAnchorUpdateState: ?string = null;

    @property _withAnchorRestoreState: ?string = null;

    @property _withAnchorSave: ?string = null;

    @method async doBeforeReset(...args): Promise<?any> {
      return (await this._doHook(this._beforeReset, args, 'Specified "beforeReset" not found', args));
    }

    @method async doAfterReset(...args): Promise<?any> {
      return (await this._doHook(this._afterReset, args, 'Specified "afterReset" not found', args));
    }

    @method async doBeforeAllEvents(...args): Promise<?any> {
      return (await this._doHook(this._beforeAllEvents, args, 'Specified "beforeAllEvents" not found', args));
    }

    @method async doAfterAllEvents(...args): Promise<?any> {
      return (await this._doHook(this._afterAllEvents, args, 'Specified "afterAllEvents" not found', args));
    }

    @method async doAfterAllTransitions(...args): Promise<?any> {
      return (await this._doHook(this._afterAllTransitions, args, 'Specified "afterAllTransitions" not found', args));
    }

    @method async doErrorOnAllEvents(...args): Promise<?any> {
      return (await this._doHook(this._errorOnAllEvents, args, 'Specified "errorOnAllEvents" not found', args));
    }

    @method async doWithAnchorUpdateState(...args): Promise<?any> {
      return (await this._doHook(this._withAnchorUpdateState, args, 'Specified "withAnchorUpdateState" not found', args));
    }

    @method async doWithAnchorRestoreState(...args): Promise<?any> {
      return (await this._doHook(this._withAnchorRestoreState, args, 'Specified "withAnchorRestoreState" not found', args));
    }

    @method async doWithAnchorSave(...args): Promise<?any> {
      return (await this._doHook(this._withAnchorSave, args, 'Specified "withAnchorSave" not found', args));
    }

    @method registerState(name: string, config: ?object = {}): StateInterface {
      if (this.states[name] != null) {
        throw new Error(`State with specified name ${name} is already registered`);
      }
      const vpoAnchor = this._anchor;
      const { State } = this.Module.NS;
      const state = State.new(name, vpoAnchor, this, config);
      this.states[name] = state;
      if (state.initial) {
        this.initialState = state;
      }
      return state;
    }

    @method removeState(name: string): boolean {
      const removedState = this.states[name];
      if (removedState != null) {
        delete this.states[name];
        if (this.initialState === removedState) {
          this.initialState = null;
        }
        if (this.currentState === removedState) {
          this.currentState = null;
        }
        return true;
      }
      return false;
    }

    @method registerEvent(asEvent: string, alDepartures: string | string[], asTarget: string, ahEventConfig: ?object = {}, ahTransitionConfig: ?object = {}) {
      const vlDepartues = _.castArray(alDepartures);
      const voNextState = this.states[asTarget];
      const voAnchor = this._anchor;
      const { Transition } = this.Module.NS;
      for (const vsState of vlDepartues) {
        const voState = this.states[vsState];
        if (voState != null) {
          const vsTransitionName = `${voState.name}_${asEvent}`;
          const voTransition = Transition.new(vsTransitionName, voAnchor, ahTransitionConfig);
          voState.defineTransition(asEvent, voNextState, voTransition, ahEventConfig);
        }
      }
    }

    @method async reset(): Promise<void> {
      await this.doBeforeReset();
      const restoredState = this.states[(await this.doWithAnchorRestoreState())];
      this.currentState = restoredState != null ? restoredState : this.initialState;
      if (this.currentState != null) {
        await this.doWithAnchorUpdateState(this.currentState.name);
      }
      await this.doAfterReset();
    }

    @method async send(asEvent: string, ...args): Promise<void> {
      const stateMachine = this;
      try {
        await stateMachine.doBeforeAllEvents(...args);
        await stateMachine.currentState.send(asEvent, ...args);
        await stateMachine.doAfterAllEvents(...args);
      } catch (error) {
        await stateMachine.doErrorOnAllEvents(error);
      }
    }

    @method async transitionTo(nextState: StateInterface, transition: TransitionInterface, ...args): Promise<void> {
      const stateMachine = this;
      const oldState = stateMachine.currentState;
      stateMachine.currentState = nextState;
      await stateMachine.doWithAnchorUpdateState(nextState.name);
      await stateMachine.doAfterAllTransitions(...args);
      await transition.doAfter(...args);
      await nextState.doBeforeEnter(...args);
      await nextState.doEnter(...args);
      await stateMachine.doWithAnchorSave();
      await transition.doSuccess(...args);
      await oldState.doAfterExit(...args);
      await nextState.doAfterEnter(...args);
    }

    // Mixin intializer methods
    @method beforeAllEvents(asMethod: string) {
      this._beforeAllEvents = asMethod;
    }

    @method afterAllTransitions(asMethod: string) {
      this._afterAllTransitions = asMethod;
    }

    @method afterAllEvents(asMethod: string) {
      this._afterAllEvents = asMethod;
    }

    @method errorOnAllEvents(asMethod: string) {
      this._errorOnAllEvents = asMethod;
    }

    @method withAnchorUpdateState(asMethod: string) {
      this._withAnchorUpdateState = asMethod;
    }

    @method withAnchorSave(asMethod: string) {
      this._withAnchorSave = asMethod;
    }

    @method withAnchorRestoreState(asMethod: string) {
      this._withAnchorRestoreState = asMethod;
    }

    @method state(asState: string, ahConfig: ?object) {
      this.registerState(asState, ahConfig);
    }

    @method event(asEvent: string, ahConfig: object | Function, amTransitionInitializer: ?Function) {
      if (_.isFunction(ahConfig)) {
        amTransitionInitializer = ahConfig;
        ahConfig = {};
      }
      if (!_.isFunction(amTransitionInitializer)) {
        amTransitionInitializer = function() {};
      }
      this.constructor._transitionConfigs = null;
      amTransitionInitializer.call(this);
      const transitionConfigs = this.constructor._transitionConfigs;
      this.constructor._transitionConfigs = null;
      for (const transitionConf of transitionConfigs) {
        const {
          previousStates,
          nextState,
          config: transitionConfig
        } = transitionConf;
        this.registerEvent(asEvent, previousStates, nextState, ahConfig, transitionConfig);
      }
      const voAnchor = this._anchor;
      if (voAnchor != null) {
        const base = voAnchor.constructor;
        if (typeof base.defineSpecialMethods === "function") {
          base.defineSpecialMethods(asEvent, this);
        }
      }
    }

    @method transition(previousStates: string[], nextState: string, ahConfig: ?object) {
      const base = this.constructor;
      if (base._transitionConfigs == null) {
        base._transitionConfigs = []
      }
      base._transitionConfigs.push({
        previousStates: previousStates,
        nextState: nextState,
        config: ahConfig
      });
    }

    constructor(name: string, anchor: object, ...args1) {
      let config, ref;
      ref = args1, [...args1] = ref, [config] = splice.call(args1, -1);
      if (config === void 0) {
        config = {};
      }
      super(... arguments);
      this.states = {};
      ({
        beforeReset: this._beforeReset,
        afterReset: this._afterReset,
        beforeAllEvents: this._beforeAllEvents,
        afterAllEvents: this._afterAllEvents,
        afterAllTransitions: this._afterAllTransitions,
        errorOnAllEvents: this._errorOnAllEvents,
        withAnchorUpdateState: this._withAnchorUpdateState,
        withAnchorSave: this._withAnchorSave,
        withAnchorRestoreState: this._withAnchorRestoreState
      } = config);
    }
  }
}
