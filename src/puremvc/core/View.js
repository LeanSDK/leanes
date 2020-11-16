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

import type { ControllerInterface } from '../interfaces/ControllerInterface';
import type { MediatorInterface } from '../interfaces/MediatorInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';
import type { ObserverInterface } from '../interfaces/ObserverInterface';
import type { ViewInterface } from '../interfaces/ViewInterface';
import { Container } from 'inversify';

export default (Module) => {
  const {
    APPLICATION_MEDIATOR,
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy,
    Utils: { _ }
  } = Module.NS;

  @initialize
  @partOf(Module)
  class View extends CoreObject implements ViewInterface {
    @nameBy static __filename = __filename;
    @meta static object = {};

    @property static MULTITON_MSG: string = "View instance for this multiton key already constructed!";

    @property _mediatorMap: {[key: string]: ?MediatorInterface} = null;
    @property _metaMediatorMap: { [key: string]: ?{ className: ?string, data: ?any } } = null;

    @property _observerMap: { [key: string]: ?Array<ObserverInterface> } = null;

    @property _multitonKey: ?string = null;

    @property _container: Container = null;

    @property static _instanceMap: { [key: string]: ?ViewInterface } = {};

    @property _ApplicationModule: ?Class<*> = null;

    @property get ApplicationModule(): Class<*> {
      if (this._ApplicationModule != null) {
        return this._ApplicationModule;
      } else {
        return this._ApplicationModule = (() => {if (this._multitonKey != null) {
          const voFacade = Module.NS.Facade.getInstance(this._multitonKey);
          const voMediator = voFacade.retrieveMediator(APPLICATION_MEDIATOR);
          if (voMediator != null) {
            const app = voMediator.getViewComponent();
            if (app != null && app.Module) {
              return app.Module;
            } else {
              return voFacade.Module;
            }
          } else {
            return voFacade.Module;
          }
        } else {
          return this.Module;
        }})()
      }
    }

    @method static getInstance(asKey: string, container: Container): View {
      if (!asKey) {
        return null;
      }
      if (View._instanceMap[asKey] == null) {
        View._instanceMap[asKey] = this.new(asKey, container);
      }
      return View._instanceMap[asKey];
    }

    @method static async removeView(asKey: string): Promise<void> {
      const voView = View._instanceMap[asKey];
      if (voView != null) {
        for (const asMediatorName of Reflect.ownKeys(voView._mediatorMap)) {
          await voView.removeMediator(asMediatorName);
        }
        delete View._instanceMap[asKey];
      }
    }

    @method registerObserver(asNotificationName: string, aoObserver: ObserverInterface): void {
      const vlObservers = this._observerMap[asNotificationName];
      if (vlObservers != null) {
        vlObservers.push(aoObserver);
      } else {
        this._observerMap[asNotificationName] = [aoObserver];
      }
    }

    @method removeObserver(asNotificationName: string, aoNotifyContext: ControllerInterface | MediatorInterface): void {
      const vlObservers: Array<ObserverInterface> = this._observerMap[asNotificationName] || [];
      for (let i: number = 0; i < vlObservers.length; i++) {
        if (vlObservers[i].compareNotifyContext(aoNotifyContext) === true) {
          vlObservers.splice(i, 1);
          break;
        }
      }
      if (vlObservers.length === 0) {
        delete this._observerMap[asNotificationName];
      }
    }

    @method async notifyObservers<T = ?any>(aoNotification: NotificationInterface<T>): Promise<void> {
      const vsNotificationName = aoNotification.getName();
      const vlObservers = this._observerMap[vsNotificationName];
      if (vlObservers != null) {
        const vlNewObservers = [...vlObservers];
        const promises = [];
        for (const voObserver of vlNewObservers) {
          promises.push(voObserver.notifyObserver(aoNotification));
        }
        await Promise.all(promises);
      }
    }

    @method registerMediator(aoMediator: MediatorInterface): void {
      const vsName = aoMediator.getMediatorName();
      // Do not allow re-registration (you must removeMediator first).
      if (this._mediatorMap[vsName] != null) {
        return;
      }
      aoMediator.initializeNotifier(this._multitonKey);
      this._mediatorMap[vsName] = aoMediator;
      const vlInterests = aoMediator.listNotificationInterests() || [];
      if (vlInterests.length > 0) {
        const voObserver = Module.NS.Observer.new(
          aoMediator.handleNotification,
          aoMediator
        );
        for (const vsInterest of vlInterests) {
          this.registerObserver(vsInterest, voObserver);
        }
      }
      // Alert the mediator that it has been registered.
      aoMediator.onRegister();
      if (!this._container.isBound(vsName)) {
        this._container.bind(vsName).toConstantValue(aoMediator);
      }
      if (!this._container.isBound(`Factory<${vsName}>`)) {
        this._container.bind(`Factory<${vsName}>`).toFactory((context) => {
          return () => {
            return aoMediator;
          }
        });
      }
    }

    @method addMediator(...args) {
      return this.lazyRegisterMediator(...args);
    }

    @method retrieveMediator(asMediatorName: string): ?MediatorInterface {
      if (this._mediatorMap[asMediatorName] == null) {
        const {
          className, data = {}
        } = this._metaMediatorMap[asMediatorName] || {};
        if (!_.isEmpty(className)) {
          const voClass = this.ApplicationModule.NS[className];
          if (!this._container.isBound(asMediatorName)) {
            this._container.bind(asMediatorName).to(voClass).inSingletonScope();
          }
          const voMediator: MediatorInterface = this._container.get(asMediatorName);
          voMediator.setName(asMediatorName);
          voMediator.setViewComponent(data);
          this.registerMediator(voMediator);
        }
      }
      return this._mediatorMap[asMediatorName] || null;
    }

    @method getMediator(...args) {
      return this.retrieveMediator(...args);
    }

    @method async removeMediator(asMediatorName: string): Promise<?MediatorInterface> {
      const voMediator = this._mediatorMap[asMediatorName];
      if (voMediator == null) {
        return null;
      }
      // Get Notification interests, if any.
      const vlInterests = voMediator.listNotificationInterests();
      // For every notification this mediator is interested in...
      for (const vsInterest of vlInterests) {
        this.removeObserver(vsInterest, voMediator);
      }
      this._mediatorMap[asMediatorName] = undefined;
      this._metaMediatorMap[asMediatorName] = undefined;
      delete this._mediatorMap[asMediatorName];
      delete this._metaMediatorMap[asMediatorName];
      // Alert the mediator that it has been removed
      await voMediator.onRemove();
      if (this._container.isBound(asMediatorName)) {
        this._container.unbind(asMediatorName);
      }
      if (this._container.isBound(`Factory<${asMediatorName}>`)) {
        this._container.unbind(`Factory<${asMediatorName}>`);
      }
      return voMediator;
    }

    @method hasMediator(asMediatorName: string): boolean {
      return (this._mediatorMap[asMediatorName] != null) || (this._metaMediatorMap[asMediatorName] != null);
    }

    @method lazyRegisterMediator(asMediatorName: string, asMediatorClassName: ?string, ahData: ?any): void {
      this._metaMediatorMap[asMediatorName] = {
        className: asMediatorClassName,
        data: ahData
      };
      if (!this._container.isBound(`Factory<${asMediatorName}>`)) {
        this._container.bind(`Factory<${asMediatorName}>`).toFactory((context) => {
          return () => {
            return this.retrieveMediator(asMediatorName)
          }
        });
      }
    }

    @method _initializeView(): void { return; }

    constructor(asKey: string, container: Container) {
      super(...arguments);
      assert(View._instanceMap[asKey] == null, View.MULTITON_MSG);
      this._multitonKey = asKey;
      this._container = container;
      this._mediatorMap = {};
      this._metaMediatorMap = {};
      this._observerMap = {};
      this._initializeView();
    }
  }
}
