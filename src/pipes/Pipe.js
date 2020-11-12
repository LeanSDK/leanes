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
  class Pipe extends CoreObject implements PipeFittingInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _output: ?PipeFittingInterface = null;

    @method connect(aoOutput: PipeFittingInterface): boolean {
      let vbSuccess = false;
      if (this._output == null) {
        this._output = aoOutput;
        vbSuccess = true;
      }
      return vbSuccess;
    }

    @method disconnect(): ?PipeFittingInterface {
      const disconnectedFitting = this._output;
      this._output = null;
      return disconnectedFitting;
    }

    @method async write(aoMessage: PipeMessageInterface): Promise<boolean> {
      return this._output && await this._output.write(aoMessage) || true;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(aoOutput: ?PipeFittingInterface) {
      super(... arguments);
      if (aoOutput != null) {
        this.connect(aoOutput);
      }
    }
  }
}
