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
    Pipe, PipeMessage, FilterControlMessage,
    initialize, partOf, meta, property, method, nameBy
  } = Module.NS;
  const { NORMAL } = PipeMessage;
  const { FILTER, SET_PARAMS, SET_FILTER, BYPASS } = FilterControlMessage;

  @initialize
  @partOf(Module)
  class Filter extends Pipe {
    @nameBy static  __filename = __filename;
    @meta static object = {};

    /**
     * @protected
     * @type string
     */
    @property _mode: string = FILTER;

    /**
     * @protected
     * @return {void}
     */
    @method _filter(aoMessage: PipeMessageInterface, aoParams: ?object): void {};

    /**
     * @protected
     * @type object
     */
    @property _params: ?object = null;

    /**
     * @protected
     * @type string
     */
    @property _name: ?string = null;

    /**
     * @protected
     * @param {object} aoMessage
     * @return {boolean}
     */
    @method _isTarget(aoMessage: PipeMessageInterface): boolean { // must be instance of FilterControlMessage
      return aoMessage instanceof FilterControlMessage && (aoMessage != null ? aoMessage.getName() : void 0) === this._name;
    }

    /**
     * @protected
     * @param {object} aoMessage
     * @return {object}
     */
    @method applyFilter(aoMessage: PipeMessageInterface): PipeMessageInterface {
      this._filter.apply(this, [aoMessage, this._params]);
      return aoMessage;
    }

    @method setParams(aoParams: object) {
      this._params = aoParams;
    }

    @method setFilter(amFilter: Function) {
      Reflect.defineProperty(this, '_filter', method(this, '_filter', {
        value: amFilter
      }));
    }

    @method async write(aoMessage: PipeMessageInterface): Promise<boolean> {
      let vbSuccess, voOutputMessage;
      vbSuccess = true;
      voOutputMessage = null;
      switch (aoMessage.getType()) {
        case NORMAL:
          try {
            if (this._mode === FILTER) {
              voOutputMessage = this.applyFilter(aoMessage);
            } else {
              voOutputMessage = aoMessage;
            }
            vbSuccess = await this._output.write(voOutputMessage);
          } catch (error) {
            console.log('>>>>>>>>>>>>>>> err', error);
            vbSuccess = false;
          }
          break;
        case SET_PARAMS:
          if (this._isTarget(aoMessage)) {
            this.setParams(aoMessage.getParams());
          } else {
            vbSuccess = await this._output.write(voOutputMessage);
          }
          break;
        case SET_FILTER:
          if (this._isTarget(aoMessage)) {
            this.setFilter(aoMessage.getFilter());
          } else {
            vbSuccess = await this._output.write(voOutputMessage);
          }
          break;
        case BYPASS:
        case FILTER:
          if (this._isTarget(aoMessage)) {
            this._mode = aoMessage.getType();
          } else {
            vbSuccess = await this._output.write(voOutputMessage);
          }
          break;
        default:
          vbSuccess = await this._output.write(outputMessage);
      }
      return vbSuccess;
    }

    constructor(asName: string, aoOutput: ?PipeFittingInterface = null, amFilter: ?Function = null, aoParams: ?object = null) {
      super(aoOutput);
      this._name = asName;
      if (amFilter != null) {
        this.setFilter(amFilter);
      }
      if (aoParams != null) {
        this.setParams(aoParams);
      }
    }
  }
}
