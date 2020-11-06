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

import type { FacadeInterface } from '../interfaces/FacadeInterface';
import type { ControllerInterface } from '../interfaces/ControllerInterface';
import type { MediatorInterface } from '../interfaces/MediatorInterface';
import type { ModelInterface } from '../interfaces/ModelInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import type { ProxyInterface } from '../interfaces/ProxyInterface';
import type { ViewInterface } from '../interfaces/ViewInterface';
import type { CaseInterface } from '../interfaces/CaseInterface';
import type { SuiteInterface } from '../interfaces/SuiteInterface';
import type { AdapterInterface } from '../interfaces/AdapterInterface';
import { Container } from 'inversify';
// import { injectable, inject, Container } from 'inversify';

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  // let container = new Container();

  @initialize
  // @injectable()
  @partOf(Module)
  class Facade extends CoreObject implements FacadeInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: string = "Facade instance for this multiton key already constructed!";

    // ipoModel = PointerT(Facade.protected({
    @property _model: ?ModelInterface = null;

    // ipoView = PointerT(Facade.protected({
    @property _view: ?ViewInterface = null;

    // ipoController = PointerT(Facade.protected({
    @property _controller: ?ControllerInterface = null;

    // ipsMultitonKey = PointerT(Facade.protected({
    @property _multitonKey: ?string = null;

    @property _container: Container = null;

    // cphInstanceMap = PointerT(Facade.protected(Facade.static({
    @property static _instanceMap: { [key: string]: ?FacadeInterface } = {};

    @property get container(): Container {
      return this._container;
    }

    // ipmInitializeModel = PointerT(Facade.protected({
    @method _initializeModel(): void {
      if (this._model == null) {
        this._model = Module.NS.Model.getInstance(this._multitonKey, this._container);
      }
      // container.bind("Model").to(Module.NS.Model);
      // if (this._model == null) {
      //   this._model = container.get("Model").getInstance(this._multitonKey);
      // }
    }

    // ipmInitializeController = PointerT(Facade.protected({
    @method _initializeController(): void {
      if (this._controller == null) {
        this._controller = Module.NS.Controller.getInstance(this._multitonKey, this._container);
      }
      // container.bind("Controller").to(Module.NS.Controller);
      // if (this._controller == null) {
      //   this._controller = container.get("Controller").getInstance(this._multitonKey);
      // }
    }

    // ipmInitializeView = PointerT(Facade.protected({
    @method _initializeView(): void {
      if (this._view == null) {
        this._view = Module.NS.View.getInstance(this._multitonKey, this._container);
      }
      // container.bind("View").to(Module.NS.View);
      // if (this._view == null) {
      //   this._view = container.get("View").getInstance(this._multitonKey);
      // }
    }

    // ipmInitializeFacade = PointerT(Facade.protected({
    @method initializeFacade(): void {
      this._initializeModel();
      this._initializeController();
      this._initializeView();
    }

    @method static getInstance(asKey: string): FacadeInterface {
      if (Facade._instanceMap[asKey] == null) {
        // Facade._instanceMap[asKey] = this.new(asKey);
        Facade._instanceMap[asKey] = new Proxy(this.new(asKey), {
          get: (target, name, receiver) => {
            if ((name in target._container) && typeof target._container[name] === "function") {
              return target._container[name].bind(target._container)
            } else {
              return target[name]
            }
          },
        });
      }
      return Facade._instanceMap[asKey];
    }

    @method async remove(): Promise<void> {
      await Module.NS.Model.removeModel(this._multitonKey);
      await Module.NS.Controller.removeController(this._multitonKey);
      await Module.NS.View.removeView(this._multitonKey);
      // container.get("Model").removeModel(this._multitonKey);
      // container.get("Controller").removeController(this._multitonKey);
      // container.get("View").removeView(this._multitonKey);
      // this._model = undefined;
      // this._view = undefined;
      // this._controller = undefined;
      delete this._model;
      delete this._view;
      delete this._controller;
      delete Facade._instanceMap[this._multitonKey];
    }

    @method registerCommand(asNotificationName: string, aCommand: Class<CoreObject>): void {
      this._controller.registerCommand(asNotificationName, aCommand);
    }

    @method addCommand(...args): void {
      return this._controller.addCommand(...args);
    }

    @method lazyRegisterCommand(asNotificationName: string, asClassName: ?string): void {
      this._controller.lazyRegisterCommand(asNotificationName, asClassName);
    }

    @method async removeCommand(asNotificationName: string): Promise<void> {
      await this._controller.removeCommand(asNotificationName);
    }

    @method hasCommand(asNotificationName: string): boolean {
      return this._controller.hasCommand(asNotificationName);
    }

    @method retrieveCommand(asNotificationName: string): ?CommandInterface {
      return this._controller.retrieveCommand(asNotificationName);
    }

    @method getCommand(...args) {
      return this._controller.getCommand(...args);
    }

    @method addCase(asKey: string, asClassName: ?string): void {
      this._controller.addCase(asKey, asClassName);
    }

    @method hasCase(asKey: string): boolean {
      return this._controller.hasCase(asKey)
    }

    @method async removeCase(asKey: string): Promise<void> {
      await this._controller.removeCase(asKey)
    }

    @method getCase(asKey: string): ?CaseInterface {
      return this._controller.getCase(asKey)
    }

    @method addSuite(asKey: string, asClassName: ?string): void {
      this._controller.addSuite(asKey, asClassName)
    }

    @method hasSuite(asKey: string): boolean {
      return this._controller.hasSuite(asKey)
    }

    @method async removeSuite(asKey: string): Promise<void> {
      await this._controller.removeSuite(asKey)
    }

    @method getSuite(asKey: string): ?SuiteInterface {
      return this._controller.getSuite(asKey)
    }

    @method registerProxy(aoProxy: ProxyInterface): void {
      this._model.registerProxy(aoProxy);
    }

    @method addProxy(...args): void {
      return this._model.addProxy(...args);
    }

    @method lazyRegisterProxy(asProxyName: string, asProxyClassName: ?string, ahData: ?any): void {
      this._model.lazyRegisterProxy(asProxyName, asProxyClassName, ahData);
    }

    @method retrieveProxy(asProxyName: string): ?ProxyInterface {
      return this._model.retrieveProxy(asProxyName);
    }

    @method getProxy(...args): ?ProxyInterface {
      return this._model.getProxy(...args);
    }

    @method async removeProxy(asProxyName: string): Promise<?ProxyInterface> {
      return await this._model.removeProxy(asProxyName);
    }

    @method hasProxy(asProxyName: string): boolean {
      return this._model.hasProxy(asProxyName);
    }

    @method addAdapter(...args): void {
      return this._model.addAdapter(...args);
    }

    @method getAdapter(asKey: string): ?AdapterInterface {
      return this._model.getAdapter(asProxyName);
    }

    @method async removeAdapter(asKey: string): Promise<void> {
      await this._model.removeAdapter(asKey);
    }

    @method hasAdapter(asKey: string): boolean {
      return this._model.hasAdapter(asKey);
    }

    @method registerMediator(aoMediator: MediatorInterface): void {
      if (this._view) {
        this._view.registerMediator(aoMediator);
      }
    }

    @method addMediator(...args): void {
      return this._view.addMediator(...args);
    }

    @method retrieveMediator(asMediatorName: string): ?MediatorInterface {
      if (this._view) {
        return this._view.retrieveMediator(asMediatorName);
      }
    }

    @method getMediator(...args): ?MediatorInterface {
      return this._view.getMediator(...args);
    }

    @method async removeMediator(asMediatorName: string): Promise<?MediatorInterface> {
      if (this._view) {
        return await this._view.removeMediator(asMediatorName);
      }
    }

    @method hasMediator(asMediatorName: string): boolean {
      if (this._view) {
        return this._view.hasMediator(asMediatorName);
      }
    }

    @method async notifyObservers(aoNotification: NotificationInterface): Promise<void> {
      if (this._view) {
        await this._view.notifyObservers(aoNotification);
      }
    }

    @method async sendNotification(asName: string, aoBody: ?any, asType: ?string): Promise<void> {
      await this.notifyObservers(Module.NS.Notification.new(asName, aoBody, asType));
    }

    @method async send(...args): Promise<void> {
      await this.sendNotification(...args);
    }

    @method async run(scriptName: string, data?: any): Promise<?any> {
      if (this._multitonKey != null) {
        const voFacade = Facade.getInstance(this._multitonKey);
        if (typeof voFacade.retrieveMediator == 'function') {
          const voMediator = voFacade.retrieveMediator(APPLICATION_MEDIATOR);
          if (typeof voMediator.run == 'function') {
            return await voMediator.run(scriptName, data);
          }
        }
      }
    }

    @method initializeNotifier(asKey: string): void {
      this._multitonKey = asKey;
      this._container = new Container();
    }

    @method static hasCore(key: string): boolean {
      return !!Facade._instanceMap[key];
    }

    @method static async removeCore(key: string): Promise<void> {
      if (!Facade._instanceMap[key]) {
        return;
      }
      await Facade._instanceMap[key].remove();
      // Module.NS.Model.removeModel(key);
      // Module.NS.View.removeView(key);
      // Module.NS.Controller.removeController(key);
      // container.get("Model").removeModel(key);
      // container.get("View").removeView(key);
      // container.get("Controller").removeController(key);
      // delete Facade._instanceMap[key];
    }

    @method static async restoreObject(acModule: Class<Module>, replica: object): Promise<FacadeInterface> {
      if ((replica != null ? replica.class : undefined) === this.name && (replica != null ? replica.type : undefined) === 'instance') {
        if (Facade._instanceMap[replica.multitonKey] == null) {
          acModule.NS[replica.application].new();
        }
        return acModule.NS.ApplicationFacade.getInstance(replica.multitonKey);
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: FacadeInterface): Promise<object> {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance._multitonKey;
      const applicationMediator = instance.retrieveMediator(APPLICATION_MEDIATOR);
      const application = applicationMediator.getViewComponent().constructor.name;
      replica.application = application;
      return replica;
    }

    constructor(asKey: string) {
      super(...arguments);
      // console.log('>?>?>? Facade', asKey);
      assert(Facade._instanceMap[asKey] == null, Facade.MULTITON_MSG);
      // console.log('>?>?>? Facade before initializeNotifier');
      this.initializeNotifier(asKey);
      // console.log('>?>?>? Facade after initializeNotifier', this._multitonKey, this._container);
      // Facade._instanceMap[asKey] = this;
      // console.log('>?>?>? Facade after Facade._instanceMap[asKey] = this');
      this.initializeFacade();
      // console.log('>?>?>? Facade after initializeFacade');
    }
  }
}
