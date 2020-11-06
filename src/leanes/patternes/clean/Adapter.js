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

import type { AdapterInterface } from '../interfaces/AdapterInterface';
import { injectable } from 'inversify';

export default (Module) => {

  const {
    CoreObject,
    assert,
    initialize, partOf, meta, method, property, nameBy
  } = Module.NS;

  @initialize
  @injectable()
  @partOf(Module)
  class Adapter extends CoreObject implements AdapterInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _cleanType = 'adapter';

    @method onRegister(): void  { return; }

    @method async onRemove(): Promise<void> { return; }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
