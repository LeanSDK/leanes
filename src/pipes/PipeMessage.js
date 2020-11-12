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

import type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class PipeMessage extends CoreObject implements PipeMessageInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static PRIORITY_HIGH: number = 1;

    @property static PRIORITY_MED: number = 5;

    @property static PRIORITY_LOW: number = 10;

    @property static BASE: string = 'namespaces/pipes/messages/';

    @property static get NORMAL() {
      return `${this.BASE}normal`;
    };

    @property _type: string = null;

    @property _priority: number = null;

    @property _header: ?object = null;

    @property _body: ?any = null;

    @method getType(): string {
      return this._type;
    }

    @method setType(asType: string) {
      this._type = asType;
    }

    @method getPriority(): number {
      return this._priority;
    }

    @method setPriority(anPriority: number) {
      this._priority = anPriority;
    }

    @method getHeader(): ?object {
      return this._header;
    }

    @method setHeader(aoHeader: ?object) {
      this._header = aoHeader;
    }

    @method getBody(): ?any {
      return this._body;
    }

    @method setBody(aoBody: ?any) {
      this._body = aoBody;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(asType: string, aoHeader: ?object = null, aoBody: ?any = null, anPriority: ?number = 5) {
      super(... arguments);
      this.setType(asType);
      if (aoHeader != null) {
        this.setHeader(aoHeader);
      }
      if (aoBody != null) {
        this.setBody(aoBody);
      }
      this.setPriority(anPriority);
    }
  }
}
