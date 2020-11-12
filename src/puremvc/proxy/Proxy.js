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

import type { ProxyInterface } from '../interfaces/ProxyInterface';

export default (Module) => {
  const {
    Notifier,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class Proxy extends Notifier implements ProxyInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _proxyName: string = null;

    @property _data: ?any = null;

    @method getProxyName(): string {
      return this._proxyName;
    }

    @method getName(): string {
      return this._proxyName;
    }

    @method setName(asName: string): void {
      this._proxyName = asName;
    }

    @method setData(ahData: ?any) {
      this._data = ahData;
      return ahData;
    }

    @method getData(): ?any {
      return this._data;
    }

    @method onRegister(): void  { return; }

    @method async onRemove(): Promise<void> { return; }

    @method static async restoreObject(acModule: Class<Module>, replica: object): Promise<ProxyInterface> {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const facade = acModule.NS.ApplicationFacade.getInstance(replica.multitonKey);
        const proxy = facade.retrieveProxy(replica.proxyName);
        return proxy;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: ProxyInterface): Promise<object> {
      const replica = await super.replicateObject(instance);
      replica.multitonKey = instance._multitonKey;
      replica.proxyName = instance.getProxyName();
      return replica;
    }

    constructor() {
      super(... arguments);
      this._proxyName = this.constructor.name;
    }
  }
}
