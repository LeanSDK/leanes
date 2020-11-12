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

import type { NotificationInterface } from '../puremvc';
import type { PipeMessageInterface } from './interfaces/PipeMessageInterface';

export default (Module) => {
  const {
    Mediator, Junction,
    assert,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;
  const { INPUT, OUTPUT } = Junction;

  @initialize
  @partOf(Module)
  class JunctionMediator extends Mediator {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static ACCEPT_INPUT_PIPE: string = 'acceptInputPipe';
    @property static ACCEPT_OUTPUT_PIPE: string = 'acceptOutputPipe';
    @property static REMOVE_PIPE: string = 'removePipe';

    @property get _junction(): Junction {
      return this.getViewComponent();
    }

    @method listNotificationInterests(): string[] {
      return [
        JunctionMediator.ACCEPT_INPUT_PIPE,
        JunctionMediator.ACCEPT_OUTPUT_PIPE,
        JunctionMediator.REMOVE_PIPE
      ];
    }

    @method handleNotification(aoNotification: NotificationInterface): void {
      const pipeName = aoNotification.getType();
      switch (aoNotification.getName()) {
        case JunctionMediator.ACCEPT_INPUT_PIPE:
          const inputPipe = aoNotification.getBody();
          if (this._junction.registerPipe(pipeName, INPUT, inputPipe)) {
            this._junction.addPipeListener(pipeName, this, this.handlePipeMessage);
          }
          break;
        case JunctionMediator.ACCEPT_OUTPUT_PIPE:
          const outputPipe = aoNotification.getBody();
          this._junction.registerPipe(pipeName, OUTPUT, outputPipe);
          break;
        case JunctionMediator.REMOVE_PIPE:
          this._junction.removePipe(pipeName);
      }
    }

    @method async handlePipeMessage(aoMessage: PipeMessageInterface): Promise<void> {
      await this.send(aoMessage.getType(), aoMessage);
    }

    @method static async restoreObject() {
      assert.fail(`restoreObject method not supported for ${this.name}`);
    }

    @method static async replicateObject() {
      assert.fail(`replicateObject method not supported for ${this.name}`);
    }
  }
}
