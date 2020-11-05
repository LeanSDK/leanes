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

import type { ModelInterface } from '../interfaces/ModelInterface';
import type { ProxyInterface } from '../interfaces/ProxyInterface';
import type { AdapterInterface } from '../interfaces/AdapterInterface';
import { Container } from "inversify";
// import { injectable, inject, Container } from "inversify";

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;

  // let container = new Container();

  @initialize
  @partOf(Module)
  class Model extends CoreObject implements ModelInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: string = 'Model instance for this multiton key already constructed!';

    // iphProxyMap = PointerT(Model.private({
    @property _proxyMap: {[key: string]: ?ProxyInterface} = null;

    // iphMetaProxyMap = PointerT(Model.private({
    @property _metaProxyMap: { [key: string]: ?{ className: ?string, data: ?any } } = null;
    @property _classNames: {[key: string]: ?string} = null;

    // ipsMultitonKey = PointerT(Model.protected({
    @property _multitonKey: ?string = null;

    @property _container: Container = null;

    // cphInstanceMap = PointerT(Model.private(Model.static({
    @property static _instanceMap: { [key: string]: ?ModelInterface } = {};

    // ipcApplicationModule = PointerT(Model.protected({
    @property _ApplicationModule: ?Class<Module> = null;

    @property get ApplicationModule(): Class<Module> {
      if (this._ApplicationModule != null) {
        return this._ApplicationModule;
      } else {
        if (this._multitonKey != null) {
          const voFacade = Module.NS.Facade.getInstance(this._multitonKey);
          if (typeof voFacade.retrieveMediator == 'function') {
            const voMediator = voFacade.retrieveMediator(APPLICATION_MEDIATOR);
            if (voMediator != null && typeof voMediator.getViewComponent == 'function') {
              const app = voMediator.getViewComponent();
              if (app && app.Module) {
                return app.Module;
              } else {
                return this.Module;
              }
            } else {
              return this.Module;
            }
          } else {
            return this.Module;
          }
        } else {
          return this.Module;
        }
      }
    }

    @method static getInstance(asKey: string, container: Container): Model {
      if (!asKey) {
        return null;
      }
      // console.log('>>>>???/ Model.getInstance 111', asKey, Model._instanceMap[asKey]);
      if (Model._instanceMap[asKey] == null) {
        Model._instanceMap[asKey] = this.new(asKey, container);
        // Model._instanceMap[asKey] = Model.new(asKey);
      }
      // const mmm = Model._instanceMap[asKey];
      // console.log('>>>>???/ Model.getInstance 222', asKey, mmm);
      // (mmm: ModelInterface);
      // console.log('>>>>???/ Model.getInstance 333', asKey);
      return Model._instanceMap[asKey];
    }

    @method static async removeModel(asKey: string): Promise<void> {
      const voModel = Model._instanceMap[asKey];
      if (voModel != null) {
        for (const asProxyName of Reflect.ownKeys(voModel._proxyMap)) {
          await voModel.removeProxy(asProxyName);
        }
        for (const asAdapterName of Reflect.ownKeys(voModel._classNames)) {
          await voModel.removeAdapter(asAdapterName);
        }
        // for (const asProxyName of container._bindingDictionary._map) {
        //   voModel.removeProxy(asProxyName[0]);
        // }
        // Model._instanceMap[asKey] = undefined;
        delete Model._instanceMap[asKey];
      }
    }

    @method registerProxy(aoProxy: ProxyInterface): void {
      const vsName = aoProxy.getName();
      // Do not allow re-registration (you must removeProxy first).
      if (this._proxyMap[vsName] != null) {
        return;
      }
      aoProxy.initializeNotifier(this._multitonKey);
      this._proxyMap[vsName] = aoProxy;
      // container.bind(aoProxy.getProxyName()).to(aoProxy);
      aoProxy.onRegister();
      if (!this._container.isBound(`Factory<${vsName}>`)) {
        this._container.bind(`Factory<${vsName}>`).toFactory((context) => {
          return () => {
            return aoProxy;
          }
        });
      }
    }

    @method addProxy(...args) {
      return this.lazyRegisterProxy(...args);
    }

    @method async removeProxy(asProxyName: string): Promise<?ProxyInterface> {
      const voProxy = this._proxyMap[asProxyName];
      // const voProxy = container.get(asProxyName);
      delete this._proxyMap[asProxyName];
      delete this._metaProxyMap[asProxyName];
      if (voProxy) {
        // this._proxyMap[asProxyName] = undefined;
        // this._metaProxyMap[asProxyName] = undefined;
        await voProxy.onRemove();
      }
      return voProxy;
    }

    @method retrieveProxy(asProxyName: string): ?ProxyInterface {
      if (this._proxyMap[asProxyName] == null) {
      // if (!container.isBound(asProxyName)) {
        const {
          className, data = {}
        } = this._metaProxyMap[asProxyName] || {};
        if (!_.isEmpty(className)) {
          const voClass = this.ApplicationModule.NS[className];
          if (!this._container.isBound(asProxyName)) {
            this._container.bind(asProxyName).to(voClass).inSingletonScope();
          }
          const voProxy: ProxyInterface = this._container.get(asProxyName);
          // const voProxy: ProxyInterface = voClass.new();
          voProxy.setName(asProxyName);
          voProxy.setData(data);
          this.registerProxy(voProxy);
        }
      }
      return this._proxyMap[asProxyName] || null;
      // return container.get(asProxyName) || null;
    }

    @method getProxy(...args) {
      return this.retrieveProxy(...args);
    }

    @method hasProxy(asProxyName: string): boolean {
      return (this._proxyMap[asProxyName] != null) || (this._metaProxyMap[asProxyName] != null);
      // return (container.get(asProxyName) != null) || (this._metaProxyMap[asProxyName] != null);
    }

    @method lazyRegisterProxy(asProxyName: string, asProxyClassName: ?string, ahData: ?any): void {
      this._metaProxyMap[asProxyName] = {
        className: asProxyClassName,
        data: ahData
      };
      if (!this._container.isBound(`Factory<${asProxyName}>`)) {
        this._container.bind(`Factory<${asProxyName}>`).toFactory((context) => {
          return () => {
            return this.retrieveProxy(asProxyName)
          }
        });
      }
    }

    @method addAdapter(asKey: string, asClassName: ?string): void {
      if (asClassName == null) {
        asClassName = asKey;
      }
      if (this._classNames[asKey] == null) {
        this._classNames[asKey] = asClassName;
      }
      if (!this._container.isBound(`Factory<${asKey}>`)) {
        this._container.bind(`Factory<${asKey}>`).toFactory((context) => {
          return () => {
            return this.getAdapter(asKey)
          }
        });
      }
    }

    @method hasAdapter(asKey: string): boolean {
      return (this._classNames[asKey] != null);
    }

    @method async removeAdapter(asKey: string): Promise<void> {
      if (this.hasAdapter(asKey)) {
        delete this._classNames[asKey];
        if (this._container.isBound(`Factory<${asKey}>`)) {
          this._container.unbind(`Factory<${asKey}>`);
        }
        if (this._container.isBound(asKey)) {
          const voAdapter: AdapterInterface = this._container.get(asKey);
          this._container.unbind(asKey);
          await voAdapter.onRemove();
        }
      }
    }

    @method getAdapter(asKey: string): ?AdapterInterface {
      let vAdapter;
      const vsClassName = this._classNames[asKey];
      if (!_.isEmpty(vsClassName)) {
        vAdapter = this._commandMap[asKey] = this.ApplicationModule.NS[vsClassName];
      }
      if (vAdapter != null) {
        if (!this._container.isBound(asKey)) {
          this._container.bind(asKey).to(vAdapter).inSingletonScope().onActivation((context, adapter) => {
            adapter.onRegister();
            return adapter;
          });
        }
        const voAdapter: AdapterInterface = this._container.get(asKey);
        return voAdapter;
      }
    }

    @method _initializeModel(): void { return; }

    constructor(asKey: string, container: Container) {
      super(...arguments);
      assert(Model._instanceMap[asKey] == null, Model.MULTITON_MSG);
      this._multitonKey = asKey;
      this._container = container;
      // Model._instanceMap[asKey] = this;
      this._proxyMap = {};
      this._metaProxyMap = {};
      this._classNames = {};
      this._initializeModel();
    }

  }
}
