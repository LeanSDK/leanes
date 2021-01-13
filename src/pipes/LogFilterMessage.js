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
    FilterControlMessage,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;

  @initialize
  @partOf(Module)
  class LogFilterMessage extends FilterControlMessage {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    @property static get BASE(): string {
      return `${FilterControlMessage.BASE}LoggerModule/`;
    }

    @property static get LOG_FILTER_NAME(): string {
      return `${this.BASE}logFilter/`;
    }

    @property static get SET_LOG_LEVEL(): string {
      return `${this.BASE}setLogLevel/`;
    }

    @property logLevel: number = 0;

    @method static filterLogByLevel(message: PipeMessageInterface, params: ?object) {
      const voParams = params || {};
      let { logLevel } = voParams;
      if (logLevel == null) {
        logLevel = 0;
      }
      if (message.getHeader().logLevel > voParams.logLevel) {
        throw new Error();
      }
    }

    constructor(action: string, logLevel: ?number = 0) {
      super(action, LogFilterMessage.LOG_FILTER_NAME, null, { logLevel });
      this.logLevel = logLevel;
    }
  }
}
