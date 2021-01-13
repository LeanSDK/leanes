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

import type { NotificationInterface } from '../interfaces/NotificationInterface';

export default (Module) => {

  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class Notification<T = ?any> extends CoreObject implements NotificationInterface<T> {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _name: string = null;

    @property _body: T = null;

    @property _type: ?string = null;

    @method getName(): string {
      return this._name;
    }

    @method setBody(aoBody: T): T {
      this._body = aoBody;
      return aoBody;
    }

    @method getBody(): T {
      return this._body;
    }

    @method setType(asType: string): string {
      this._type = asType;
      return asType;
    }

    @method getType(): ?string {
      return this._type;
    }

    @method toString(): string {
      return `Notification Name: ${this.getName()}\nBody: ${(this.getBody() != null ? this.getBody().toString() : 'null')}\nType: ${(this.getType() != null ? this.getType() : 'null')}`;
    }

    @method static async restoreObject(acModule: Class<*>, replica: object): NotificationInterface<T> {
      if ((replica != null ? replica.class : void 0) === this.name && (replica != null ? replica.type : void 0) === 'instance') {
        const { name, body, type } = replica.notification;
        const instance = this.new(name, body, type);
        return instance;
      } else {
        return await super.restoreObject(acModule, replica);
      }
    }

    @method static async replicateObject(instance: NotificationInterface<T>): object {
      const replica = await super.replicateObject(instance);
      replica.notification = {
        name: instance.getName(),
        body: instance.getBody(),
        type: instance.getType()
      };
      return replica;
    }

    constructor(asName: string, aoBody: T, asType: ?string) {
      super(... arguments);
      this._name = asName;
      this._body = aoBody;
      if (asType != null) {
        this._type = asType;
      }
    }
  }
}
