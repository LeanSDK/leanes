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

export default (Module) => {
  const {
    Pipe,
    initialize, partOf, meta, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class TeeMerge extends Pipe {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @method connectInput(aoInput: PipeFittingInterface): boolean {
      return aoInput.connect(this);
    }

    constructor(input1: ?PipeFittingInterface = null, input2: ?PipeFittingInterface = null) {
      super(... arguments);
      if (input1 != null) {
        this.connectInput(input1);
      }
      if (input2 != null) {
        this.connectInput(input2);
      }
    }
  }
}
