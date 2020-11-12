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
  # Технология машины состояний проектировалась с оглядкой на
  https://github.com/aasm/aasm

class Tomato extends CoreObject
  @StateMachine 'default', ->
    @beforeAllEvents 'beforeAllEvents'
    @afterAllTransitions 'afterAllTransitions'
    @afterAllEvents 'afterAllEvents'
    @errorOnAllEvents 'errorOnAllEvents'
    @state 'first',
      initial: yes
      beforeExit: 'beforeExitFromFirst'
      afterExit: 'afterExitFromFirst'
    @state 'sleeping',
      beforeExit: 'beforeExitFromSleeping'
      afterExit: 'afterExitFromSleeping'
    @state 'running',
      beforeEnter: 'beforeEnterToRunning'
      afterEnter: 'afterEnterFromRunning'
    @event 'run',
      before: 'beforeRun'
      after: 'afterRun'
      error: 'errorOnRun'
     , =>
        @transition ['first', 'second'], 'third',
          guard: 'checkSomethingCondition'
          after: 'afterFirstSecondToThird'
        @transition 'third', 'running',
          if: 'checkThirdCondition'
          after: 'afterThirdToRunning'
        @transition ['first', 'third', 'sleeping', 'running'], 'superRunning',
          unless: 'checkThirdCondition'
          after: 'afterSleepingToRunning'

  checkSomethingCondition: ->
    console.log '!!!???? checkSomethingCondition'
    yes
  checkThirdCondition: ->
    console.log '!!!???? checkThirdCondition'
    yes
  beforeExitFromSleeping: ->
    console.log 'DFSDFSD beforeExitFromSleeping'
  beforeExitFromFirst: ->
    console.log 'DFSDFSD beforeExitFromFirst'
  afterExitFromSleeping: ->
    console.log 'DFSDFSD afterExitFromSleeping'
  afterExitFromFirst: ->
    console.log 'DFSDFSD afterExitFromFirst'
  beforeEnterToRunning: ->
    console.log 'DFSDFSD beforeEnterToRunning'
  beforeRun: ->
    console.log 'DFSDFSD beforeRun'
  afterRun: ->
    console.log 'DFSDFSD afterRun'
  afterFirstSecondToThird: (firstArg, secondArg)->
    console.log firstArg, secondArg # => {key: 'value'}, 125
    console.log 'DFSDFSD afterFirstSecondToThird'
  afterThirdToRunning: (firstArg, secondArg)->
    console.log firstArg, secondArg # => {key: 'value'}, 125
    console.log 'DFSDFSD afterThirdToRunning'
  afterSleepingToRunning: (firstArg, secondArg)->
    console.log firstArg, secondArg # => {key: 'value'}, 125
    console.log 'DFSDFSD afterSleepingToRunning'
  afterRunningToSleeping: ->
    console.log 'DFSDFSD afterRunningToSleeping'

  beforeAllEvents: ->
    console.log 'DFSDFSD beforeAllEvents'
  afterAllTransitions: ->
    console.log 'DFSDFSD afterAllTransitions'
  afterAllEvents: ->
    console.log 'DFSDFSD afterAllEvents'
  errorOnAllEvents: (err)->
    console.log 'DFSDFSD errorOnAllEvents', err, err.stack
  errorOnRun: ->
    console.log 'DFSDFSD errorOnRun'

tomato = new Tomato()
tomato.run({key: 'value'}, 125) # можно передать как аргументы какие нибудь данные, они будут переданы внутырь коллбеков указанных на транзишенах в ключах :after
console.log 'tomato.state', tomato.state
*/

/*
StateMachine flow

try
  event           beforeAllEvents
  event           before
  event           guard
    transition      guard
    old_state       beforeExit
    old_state       exit
    ...update state...
                    afterAllTransitions
    transition      after
    new_state       beforeEnter
    new_state       enter
    ...save state...
    transition      success             # if persist successful
    old_state       afterExit
    new_state       afterEnter
  event           success             # if persist successful
  event           after
  event           afterAllEvents
catch
  event           error
  event           errorOnAllEvents
*/
const hasProp = {}.hasOwnProperty;
const splice = [].splice;

const iplStateMachines = Symbol.for('~stateMachines');

export default (Module) => {
  const {
    StateMachine,
    initializeMixin, meta, method, property,
    Utils: { _ }
  } = Module.NS;

  Module.defineMixin(__filename, (BaseClass) => {
    @initializeMixin
    class Mixin extends BaseClass {
      @meta static object = {};

      @method initializeStateMachines() {
        const configs = this.constructor.metaObject.getGroup('stateMachines', false);
        if (_.isObject(configs)) {
          for (const vsName in configs) {
            if (!hasProp.call(configs, vsName)) continue;
            const vmConfig = configs[vsName];
            if (this[iplStateMachines][vsName] == null) {
              this[iplStateMachines][vsName] = StateMachine.new(vsName, this, {});
              vmConfig.call(this[iplStateMachines][vsName]);
              this[iplStateMachines][vsName].reset();
            }
          }
        }
      }

      @method static defineSpecialMethods(asEvent, aoStateMachine) {
        Reflect.defineProperty(this.prototype, asEvent, method(this.prototype, asEvent, {
          value: async function (...args) {
            return await aoStateMachine.send(asEvent, ...args);
          }
        }));
        const vsResetName = `reset${_.upperFirst(aoStateMachine.name)}`;
        if (this.prototype[vsResetName] == null)
          Reflect.defineProperty(this.prototype, vsResetName, method(this.prototype, vsResetName, {
            value: async function (...args) {
              return await aoStateMachine.reset();
            }
          }));
      }

      @method getStateMachine(asName: string) {
        const stateMachines = this[iplStateMachines];
        return stateMachines != null ? stateMachines[asName] : undefined;
      }

      constructor() {
        super(... arguments);
        this[iplStateMachines] = {};
        this.initializeStateMachines();
      }
    };

    property(Mixin.prototype, iplStateMachines, { value: null });

    return Mixin;

  });
}
