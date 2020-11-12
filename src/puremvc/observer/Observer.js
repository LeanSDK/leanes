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

import type { ObserverInterface } from '../interfaces/ObserverInterface';
import type { NotificationInterface } from '../interfaces/NotificationInterface';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class Observer extends CoreObject implements ObserverInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _notify: ?Function = null;

    @property _context: ?any = null;

    @method setNotifyMethod(amNotifyMethod: Function): void {
      this._notify = amNotifyMethod;
    }

    @method setNotifyContext(aoNotifyContext: any): void {
      this._context = aoNotifyContext;
    }

    @method getNotifyMethod(): ?Function {
      return this._notify;
    }

    @method getNotifyContext(): ?any {
      return this._context;
    }

    @method compareNotifyContext(object: any): boolean {
      return object === this._context;
    }

    @method async notifyObserver(notification: NotificationInterface): Promise<void> {
      await this.getNotifyMethod().call(this.getNotifyContext(), notification);
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(amNotifyMethod: ?Function, aoNotifyContext: ?any) {
      super(... arguments);
      if (amNotifyMethod) {
        this.setNotifyMethod(amNotifyMethod);
      }
      if (aoNotifyContext) {
        this.setNotifyContext(aoNotifyContext);
      }
    }
  }
}
