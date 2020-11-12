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

import type { FacadeInterface } from '../puremvc';
import type { PipeAwareInterface } from './interfaces/PipeAwareInterface';

export default (Module) => {
  const {
    CoreObject, JunctionMediator,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;
  const { ACCEPT_INPUT_PIPE, ACCEPT_OUTPUT_PIPE } = JunctionMediator;

  @initialize
  @partOf(Module)
  class PipeAwareModule extends CoreObject implements PipeAwareInterface {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static STDOUT: string = 'standardOutput';
    @property static STDIN: string = 'standardInput';
    @property static STDLOG: string = 'standardLog';
    @property static STDSHELL: string = 'standardShell';

    @property facade: FacadeInterface = null;

    @method acceptInputPipe(asName, aoPipe) {
      this.facade.send(ACCEPT_INPUT_PIPE, aoPipe, asName);
    }

    @method acceptOutputPipe(asName, aoPipe) {
      this.facade.send(ACCEPT_OUTPUT_PIPE, aoPipe, asName);
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }

    constructor(aoFacade: ?FacadeInterface) {
      super(... arguments);
      if (aoFacade != null) {
        this.facade = aoFacade;
      }
    }
  }
}
