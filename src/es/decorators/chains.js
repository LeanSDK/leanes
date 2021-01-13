/* @flow-runtime warn, annotate */

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

import _ from 'lodash';
import assert from 'assert';

const cpoMetaObject = Symbol.for('~metaObject');
const indexOf = [].indexOf;

var cachedChainsMixin = null;

export default function chains(
  first: (string | string[] | Function),
  last: ?Function
) {
  return target => {
    assert(target[cpoMetaObject] != null, 'Target for `chains` decorator must be a Class');
    const chainsNames = _.isFunction(first)
      ? []
      : first;
    const functor = last || first;

    assert(_.isFunction(functor), 'Last argument in `chains` decorator must be a function');

    const { CoreObject, initializeMixin, meta, method } = target.Module.NS;

    const callWithChainName = (isArray: boolean, isAsync: boolean): string => {
      if (isArray) {
        if (isAsync) {
          return '_callWithChainNameOnArrayAsync';
        } else {
          return '_callWithChainNameOnArray';
        }
      } else {
        if (isAsync) {
          return '_callWithChainNameOnSingleAsync';
        } else {
          return '_callWithChainNameOnSingle';
        }
      }
    };

    const ChainsMixin = cachedChainsMixin || ((BaseClass) => {
      class Mixin extends BaseClass {
        @meta static object = {};

        @method static _getChains(AbstractClass = null): string[] {
          AbstractClass = AbstractClass || this;
          (AbstractClass: Class<*>);
          const ret = Object.keys(AbstractClass.metaObject.getOwnGroup('chains')) || [];
          return ret;
        }

        @method callAsChain(isAsync, methodName, ...args) {
          const name = Symbol.for(`~chain_${methodName}`);
          if (isAsync) {
            return (async () => {
              try {
                const asyncInitialData = _.castArray(
                  (await this.initialAction(isAsync, methodName, ...args)) || []
                );
                const asyncData = _.castArray(
                  (await this.beforeAction(isAsync, methodName, ...asyncInitialData)) || []
                );
                const asyncResult = await (typeof this[name] === "function" ?
                  this[name](...asyncData)
                :
                  undefined
                );
                const asyncAfterResult = await this.afterAction(isAsync, methodName, asyncResult);
                return await this.finallyAction(isAsync, methodName, asyncAfterResult);
              } catch (error) {
                await this.errorAction(isAsync, methodName, error);
                throw error;
              }
            })();
          } else {
            try {
              const initialData = _.castArray(
                this.initialAction(isAsync, methodName, ...args) || []
              );
              const data = _.castArray(
                this.beforeAction(isAsync, methodName, ...initialData) || []
              );
              const result = typeof this[name] === "function" ?
                this[name](...data)
              :
                undefined;
              const afterResult = this.afterAction(isAsync, methodName, result);
              return this.finallyAction(isAsync, methodName, afterResult);
            } catch (error) {
              this.errorAction(isAsync, methodName, error);
              throw error;
            }
          }
        }

        @method _callWithChainNameOnSingle(methodName: string, actionName: string, singleData: ?any): ?any {
          if (_.isFunction(this[methodName])) {
            this[methodName].chainName = actionName;
            const res = this[methodName](singleData);
            delete this[methodName].chainName;
            return res;
          } else {
            return singleData;
          }
        }

        @method _callWithChainNameOnArray(methodName: string, actionName: string, arrayData: Array): Array {
          arrayData = _.castArray(arrayData);
          if (_.isFunction(this[methodName])) {
            this[methodName].chainName = actionName;
            const res = this[methodName](...arrayData);
            delete this[methodName].chainName;
            return res;
          } else {
            return arrayData;
          }
        }

        @method async _callWithChainNameOnSingleAsync(methodName: string, actionName: string, singleData: ?any): Promise<any> {
          if (_.isFunction(this[methodName])) {
            this[methodName].chainName = actionName;
            const res = await Promise.resolve(this[methodName](singleData));
            delete this[methodName].chainName;
            return res;
          } else {
            return singleData;
          }
        }

        @method async _callWithChainNameOnArrayAsync(methodName: string, actionName: string, arrayData: Array): Promise<Array> {
          arrayData = _.castArray(arrayData);
          if (_.isFunction(this[methodName])) {
            this[methodName].chainName = actionName;
            const res = await Promise.resolve(this[methodName](...arrayData));
            delete this[methodName].chainName;
            return res;
          } else {
            return arrayData;
          }
        }

        @method static _defineHookMethods([ asHookName: string, isArray: boolean ]): void {
          const vsHookNames = `${asHookName}s`;
          const vsActionName = `${asHookName.replace('Hook', '')}Action`;
          Reflect.defineProperty(this, asHookName, method(
            this, asHookName, {
              value: function(method: string, options: ?{
                only?: (string | string[]),
                except?: (string | string[])
              } = {}) {
                switch (false) {
                  case options.only == null:
                    this.metaObject.appendMetaData('hooks', vsHookNames, {
                      method: method,
                      type: 'only',
                      actions: options.only
                    });
                    break;
                  case options.except == null:
                    this.metaObject.appendMetaData('hooks', vsHookNames, {
                      method: method,
                      type: 'except',
                      actions: options.except
                    });
                    break;
                  default:
                    this.metaObject.appendMetaData('hooks', vsHookNames, {
                      method: method,
                      type: 'all'
                    });
                }
              }
            }
          ));
          Reflect.defineProperty(this, vsHookNames, method(
            this, vsHookNames, {
              value: function(): Array<{
                method: string,
                type: ('only' | 'except' | 'all'),
                actions?: string | string[]
              }> {
                return _.uniqWith(
                  this.metaObject.getGroup('hooks')[vsHookNames] || [],
                  (first, second) => {
                    const fstActions = first.actions;
                    const secActions = second.actions;
                    return (
                      first.method === second.method
                      &&
                      first.type === second.type
                      &&
                      (
                        fstActions != null ? fstActions.join(',') : undefined
                      ) === (
                        secActions != null ? secActions.join(',') : undefined
                      )
                    );
                  }
                );
              }
            }
          ));

          Reflect.defineProperty(this.prototype, vsActionName, method(
            this.prototype, vsActionName, {
              value: function(isAsync, action, ...data) {
                if (!isArray) {
                  data = data[0];
                }
                const vlHooks = this.constructor[vsHookNames]();
                if (isAsync) {
                  return (async () => {
                    for (const { method, type, actions } of vlHooks) {
                      data = await (async () => {
                        switch (false) {
                          case type !== 'all':
                          case !(type === 'only' && indexOf.call(actions, action) >= 0):
                          case !(type === 'except' && indexOf.call(actions, action) < 0):
                            return await this[callWithChainName(isArray, isAsync)](method, action, data);
                          default:
                            return data;
                        }
                      })();
                    }
                    return data;
                  })();
                } else {
                  for (const { method, type, actions } of vlHooks) {
                    data = (() => {
                      switch (false) {
                        case type !== 'all':
                        case !(type === 'only' && indexOf.call(actions, action) >= 0):
                        case !(type === 'except' && indexOf.call(actions, action) < 0):
                          return this[callWithChainName(isArray, isAsync)](method, action, data);
                        default:
                          return data;
                      }
                    })();
                  }
                  return data;
                }
              }
            }
          ));
        }

        @method static defineChains() {
          // console.log('>>??? chains.defineChains before _getChains');
          const vlChains = this._getChains();
          // console.log('>>??? chains.defineChains vlChains', vlChains);
          if (!_.isEmpty(vlChains)) {
            const { instanceMethods } = this;
            for (const methodName of vlChains) {
              const name = `chain_${methodName}`;
              const pointer = Symbol.for(`~${name}`);
              const vmFunctor = instanceMethods[methodName];
              if ((vmFunctor != null) && !vmFunctor.isChain) {
                const descriptor = {
                  configurable: true,
                  enumerable: true,
                  value: vmFunctor
                };
                Reflect.defineProperty(descriptor.value, 'name', {
                  value: name,
                  configurable: true
                });
                Reflect.defineProperty(this.prototype, pointer, descriptor);
                if (vmFunctor.isAsync) {
                  Reflect.defineProperty(this.prototype, methodName, method(
                    this.prototype, methodName, {
                      value: async function(...args) {
                        return await this.callAsChain(true, methodName, ...args);
                      }
                    }
                  ));
                } else {
                  Reflect.defineProperty(this.prototype, methodName, method(
                    this.prototype, methodName, {
                      value: function(...args) {
                        return this.callAsChain(false, methodName, ...args);
                      }
                    }
                  ));
                }
                this.prototype[methodName].isChain = true;
              }
            }
          }
        }

        @method static onInitialize(...args) {
          super.onInitialize(...args);
          this.defineChains();
        }

        @method static onInitializeMixin(...args) {
          super.onInitializeMixin(...args);
          this.defineChains();
        }
      };
      for (const methodName of [
        ['initialHook', true],
        ['beforeHook', true],
        ['afterHook', false],
        ['finallyHook', false],
        ['errorHook', false]
      ]) {
        if (typeof Mixin[methodName[0]] == 'undefined') {
          Mixin._defineHookMethods(methodName);
        }
      }
      return initializeMixin(Mixin);
    });

    if (cachedChainsMixin == null) {
      Reflect.defineProperty(ChainsMixin, 'name', {
        configurable: false,
        enumerable: true,
        writable: false,
        value: 'ChainsMixin'
      });
      cachedChainsMixin = ChainsMixin;
    }

    const targetMixinsNames = Object.keys(
      target.metaObject.getGroup('applyedMixins')
    );

    if (!_.includes(targetMixinsNames, 'ChainsMixin')) {
      const SuperClass = Reflect.getPrototypeOf(target);
      const MixinClass = ChainsMixin(SuperClass);
      Reflect.defineProperty(MixinClass, 'name', {
        value: ChainsMixin.name
      })
      Reflect.setPrototypeOf(target, MixinClass);
      Reflect.setPrototypeOf(target.prototype, MixinClass.prototype);
      target.metaObject.parent = MixinClass.metaObject;
      target.metaObject.addMetaData('applyedMixins', MixinClass.name, MixinClass);
    }

    const alChains = _.castArray(chainsNames);
    for (const vsChainName of alChains) {
      target.metaObject.addMetaData('chains', vsChainName, '');
    }

    functor.call(target);
    return target;
  };
}
