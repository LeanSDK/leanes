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

const splice = [].splice;

export default (Module) => {
  const {
    CoreObject,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class TeeSplit extends CoreObject implements PipeFittingInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _outputs: ?Array<PipeFittingInterface> = null;

    @method connect(aoOutput: PipeFittingInterface): boolean {
      if (this._outputs == null) {
        this._outputs = [];
      }
      this._outputs.push(aoOutput);
      return true;
    }

    @method disconnect(): ?PipeFittingInterface {
      if (this._outputs == null) {
        this._outputs = [];
      }
      return this._outputs.pop();
    }

    @method disconnectFitting(aoTarget: PipeFittingInterface): PipeFittingInterface {
      let ref1;
      let voRemoved = null;
      if (this._outputs == null) {
        this._outputs = [];
      }
      const alOutputs = this._outputs;
      let j;
      for (let i = j = 0, len = alOutputs.length; j < len; i = ++j) {
        const aoOutput = alOutputs[i];
        if (aoOutput === aoTarget) {
          splice.apply(this._outputs, [i, i - i + 1].concat(ref1 = [])), ref1;
          voRemoved = aoOutput;
          break;
        }
      }
      return voRemoved;
    }

    @method async write(aoMessage: PipeMessageInterface): Promise<boolean> {
      let vbSuccess = true;
      for (const voOutput of this._outputs) {
        if (!(await voOutput.write(aoMessage))) {
          return vbSuccess = false;
        }
      }
      return vbSuccess;
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(output1: ?PipeFittingInterface = null, output2: ?PipeFittingInterface = null) {
      super(... arguments);
      if (output1 != null) {
        this.connect(output1);
      }
      if (output2 != null) {
        this.connect(output2);
      }
    }
  }
}
