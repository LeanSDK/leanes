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
import type { PipeFittingInterface } from './interfaces/PipeFittingInterface';

export default (Module) => {
  const {
    Pipe, PipeMessage, LineControlMessage,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;
  const { NORMAL } = PipeMessage;
  const { SORT, FLUSH, FIFO } = LineControlMessage;

  @initialize
  @partOf(Module)
  class Line extends Pipe {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property _mode: string = SORT;

    @property _messages: ?Array<PipeMessageInterface> = null;

    @method _sortMessagesByPriority(msgA: PipeMessageInterface, msgB: PipeMessageInterface): number {
      let vnNum = 0;
      if (msgA.getPriority() < msgB.getPriority()) {
        vnNum = -1;
      }
      if (msgA.getPriority() > msgB.getPriority()) {
        vnNum = 1;
      }
      return vnNum;
    }

    @method _store(aoMessage: PipeMessageInterface): void {
      if (this._messages == null) {
        this._messages = [];
      }
      this._messages.push(aoMessage);
      if (this._mode === SORT) {
        this._messages.sort(this._sortMessagesByPriority.bind(this));
      }
    }

    @method async _flush(): Promise<boolean> {
      let voMessage;
      let vbSuccess = true;
      if (this._messages == null) {
        this._messages = [];
      }
      while ((voMessage = this._messages.shift()) != null) {
        let ok = await this._output.write(voMessage);
        if (!ok) {
          vbSuccess = false;
        }
      }
      return vbSuccess;
    }

    @method async write(aoMessage: PipeMessageInterface): Promise<boolean> {
      let vbSuccess = true;
      let voOutputMessage = null;
      switch (aoMessage.getType()) {
        case NORMAL:
          this._store(aoMessage);
          break;
        case FLUSH:
          vbSuccess = await this._flush();
          break;
        case SORT:
        case FIFO:
          this._mode = aoMessage.getType();
      }
      return vbSuccess;
    }

    constructor(aoOutput: ?PipeFittingInterface = null) {
      super(aoOutput);
    }
  }
}
