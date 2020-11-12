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

import type { PipeFittingInterface } from './interfaces/PipeFittingInterface';
import type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class PipeListener extends CoreObject implements PipeFittingInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _context: object;

    @property _listener: <T = ?any>() => T = null;

    @method connect(pipe: PipeFittingInterface): boolean {
      return false;
    }

    @method disconnect(): ?PipeFittingInterface {
      return null;
    }

    @method async write(aoMessage: PipeMessageInterface): Promise<boolean> {
      await this._listener.call(this._context, aoMessage);
      return true;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(aoContext: object, amListener: Function) {
      super(... arguments);
      this._context = aoContext;
      this._listener = amListener;
    }
  }
}
